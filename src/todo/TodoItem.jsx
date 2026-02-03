function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <div className={`todo-item ${task.completed ? "done" : ""}`}>
      <span onClick={() => toggleTask(task.id)}>
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>❌</button>
    </div>
  );
}

export default TodoItem;
