'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useTodos from '@/hooks/todos'
import { Todo } from '@/types/Todo'
import { useState } from 'react'

interface TitleInputProps {
  id: number
  todo: Todo
  newTitle: string
  setNewTitle: any
  setDropdownOpen: any
}

export function TitleInput({
  id,
  todo,
  setNewTitle,
  setDropdownOpen
}: TitleInputProps) {
  const [title, setTitle] = useState<string>(todo.content) // Initialize with current content

  const { handleEditTodo, loadTodos } = useTodos()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value) // Update local state
  }

  const handleSubmit = async () => {
    // Prepare the changes object
    const changes = {
      id: id,
      content: title
    }

    // Call handleEditTodo with the id and the changes
    await handleEditTodo(id, changes)
    setNewTitle(title)
    loadTodos()
    setDropdownOpen(false)
  }

  return (
    <div className="flex max-w-sm items-center space-x-2 bg-transparent">
      <Input
        type="text"
        className="bg-main py-2 mb-2"
        placeholder="New Title"
        onChange={handleChange}
        value={title}
      />
      <Button type="submit" className="bg-main mb-2" onClick={handleSubmit}>
        Update
      </Button>
    </div>
  )
}
