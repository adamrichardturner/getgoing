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
  setDropdownOpen,
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
      content: title,
    }

    // Call handleEditTodo with the id and the changes
    await handleEditTodo(id, changes)
    setNewTitle(title)
    loadTodos()
    setDropdownOpen(false)
  }

  return (
    <div className='flex flex-col max-w-sm items-center bg-transparent'>
      <Input
        name='editTask'
        type='text'
        className='py-2 border border-itemBorder shadow hover:shadow-lg bg-inputBar hover:bg-inputBarHover'
        placeholder='New Title'
        onChange={handleChange}
        value={title}
      />
    </div>
  )
}
