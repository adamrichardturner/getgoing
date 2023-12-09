'use client'
import { useState } from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import useTodos from '@/hooks/todos'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { TitleInput } from './TitleInput'
import { Todo } from '@/types/Todo'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function TaskContext({ todo, id }: { todo: Todo; id: number }) {
  const { handleDeleteTodo } = useTodos()
  const [category, setCategory] = useState<Checked>(false)
  const [newCategory, setNewCategory] = useState<string>('')
  const [color, setColor] = useState<Checked>(false)
  const [newColor, setNewColor] = useState<string>('')
  const [dueDate, setDueDate] = useState<Checked>(false)
  const [newDueDate, setNewDueDate] = useState<string>('')
  const [newTitle, setNewTitle] = useState<string>('')

  const handleDelete = async (id: number) => {
    await handleDeleteTodo(id)
  }

  return (
    <div className="relative bottom-6 left-[0] shadow-none outline-none border-none">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent p-0 shadow-none outline-none border-none">
            <FontAwesomeIcon
              icon={faEllipsis}
              className="dark:text-white text-bodyText shadow-none outline-none border-none"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Edit Task</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <span className="text-xs">Edit Title</span>
          <TitleInput
            todo={todo}
            id={todo.id}
            newTitle={newTitle}
            setNewTitle={setNewTitle} // Pass setNewTitle directly
          />
          <DropdownMenuCheckboxItem
            checked={category}
            onCheckedChange={setCategory}
            disabled
          >
            Change Category
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={color} onCheckedChange={setColor}>
            Change Color
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={dueDate}
            onCheckedChange={setDueDate}
          >
            Change Due Date
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => handleDelete(todo.id)}>
            Delete Task
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
