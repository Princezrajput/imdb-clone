import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { socket } from "../services/socket";
import CommentItem from "./CommentItem";

function Comments({ movieId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // Listen realtime updates
  useEffect(() => {
    socket.on("comments:init", (allComments) => {
      setComments(allComments);
    });

    socket.on("comment:created", (newComment) => {
      setComments((prev) => {
        // remove pending temp version if exists
        const filtered = prev.filter((c) => c.tempId !== newComment.tempId);
        return [...filtered, { ...newComment, pending: false }];
      });
    });

    return () => {
      socket.off("comments:init");
      socket.off("comment:created");
    };
  }, []);

  // Only show comments for this movie
  const movieComments = useMemo(() => {
    return comments.filter((c) => c.movieId === movieId);
  }, [comments, movieId]);

  // Convert flat -> nested
  const nestedComments = useMemo(() => {
    const map = {};
    const roots = [];

    movieComments.forEach((c) => {
      map[c.id] = { ...c, replies: [] };
    });

    movieComments.forEach((c) => {
      if (c.parentId) {
        if (map[c.parentId]) {
          map[c.parentId].replies.push(map[c.id]);
        }
      } else {
        roots.push(map[c.id]);
      }
    });

    return roots.sort((a, b) => a.createdAt - b.createdAt);
  }, [movieComments]);

  // Create comment (Optimistic UI)
  const createComment = (parentId, commentText) => {
    setError("");

    const tempId = uuid();

    const optimisticComment = {
      id: tempId,
      tempId,
      movieId,
      parentId: parentId || null,
      text: commentText,
      user: "Guest",
      createdAt: Date.now(),
      pending: true,
    };

    // 1) Add instantly
    setComments((prev) => [...prev, optimisticComment]);

    // 2) Send to server
    socket.emit(
      "comment:create",
      {
        tempId,
        movieId,
        parentId,
        text: commentText,
        user: "Guest",
      },
      (response) => {
        // 3) Rollback if rejected
        if (!response.ok) {
          setComments((prev) => prev.filter((c) => c.tempId !== tempId));
          setError(response.error || "Comment rejected by server");
        }
      }
    );
  };

  const handleSend = () => {
    if (!text.trim()) return;
    createComment(null, text);
    setText("");
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Comments</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "15px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          style={{ width: "100%", padding: "10px" }}
        />
        <button onClick={handleSend} style={{ marginTop: "10px" }}>
          Post Comment
        </button>
      </div>

      {nestedComments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        nestedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={comment.replies}
            onReply={(parentId, replyText) => createComment(parentId, replyText)}
          />
        ))
      )}
    </div>
  );
}

export default Comments;
