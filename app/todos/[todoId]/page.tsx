export default function TodoDetail({ params }: { params: { todoId: string } }) {
  let { todoId } = params
  return (
    <div className="bg-very-light-gray dark:bg-very-dark-blue-bg min-h-screen">
      <h2>ToDoId: {todoId}</h2>
      {todo ? (
        <div>
          <p>{todo.content}</p> {/* Replace with the appropriate property */}
          {/* Render other details of the 'todo' here */}
        </div>
      ) : (
        <p>Todo not found</p>
      )}
    </div>
  )
}
