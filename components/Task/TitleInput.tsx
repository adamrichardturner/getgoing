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
}

export function TitleInput({ id, todo, setNewTitle }: TitleInputProps) {
  console.log(id)
  const [title, setTitle] = useState<string>(todo.content) // Initialize with current content

  const { handleEditTodo } = useTodos()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value) // Update local state
  }

  const handleSubmit = async () => {
    await handleEditTodo({ id: id, content: title })
    setNewTitle(title) // Optionally update parent state if needed
  }

  return (
    <div className="flex max-w-sm items-center space-x-2 bg-transparent">
      <Input
        type="text"
        className="bg-main py-2"
        placeholder="New Title"
        onChange={handleChange}
        value={title}
      />
      <Button type="submit" className="bg-main" onClick={handleSubmit}>
        Update
      </Button>
    </div>
  )
}
