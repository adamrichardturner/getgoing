export default function TodoDetail({ params }: { params: { todoId: string } }) {
  let { todoId } = params
  return (
    <div className="bg-very-light-gray dark:bg-very-dark-blue-bg min-h-screen">
      {todoId}
    </div>
  )
}
