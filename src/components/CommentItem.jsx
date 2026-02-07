import { useState } from "react";

function CommentItem({ comment, replies, onReply }) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  const handleSubmit = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div style={{ marginTop: "12px", paddingLeft: "10px" }}>
      <div
        style={{
          padding: "10px",
          borderRadius: "8px",
          background: "#1f1f1f",
          opacity: comment.pending ? 0.6 : 1,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>{comment.user}</strong>{" "}
          {comment.pending && <span>(sending...)</span>}
        </p>
        <p style={{ margin: "6px 0" }}>{comment.text}</p>

        <button onClick={() => setShowReply(!showReply)}>Reply</button>

        {showReply && (
          <div style={{ marginTop: "8px" }}>
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write reply..."
              style={{ width: "100%", padding: "8px" }}
            />
            <button onClick={handleSubmit} style={{ marginTop: "6px" }}>
              Send Reply
            </button>
          </div>
        )}
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={reply.replies || []}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
