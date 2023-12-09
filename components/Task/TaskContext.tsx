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
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleDelete = async (id: number) => {
    await handleDeleteTodo(id)
  }

  return (
    <div className="relative bottom-6 left-[0] shadow-none outline-none border-none">
      <DropdownMenu
        modal={false}
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
      >
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent p-0 shadow-none outline-none border-none">
            <FontAwesomeIcon
              icon={faEllipsis}
              className="dark:text-white text-bodyText shadow-none outline-none border-none"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-4">
          <DropdownMenuLabel>Edit Task</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <span className="text-xs">Change Title</span>
          <TitleInput
            todo={todo}
            id={todo.id}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            setDropdownOpen={setDropdownOpen}
          />
          {/* <DropdownMenuCheckboxItem
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
          </DropdownMenuCheckboxItem> */}
          <div
            className="bg-red-500 hover:bg-red-800 rounded-md cursor-pointer flex flex-row items-center justify-center text-center py-2 px-2"
            onClick={() => handleDelete(todo.id)}
          >
            <span className="text-xs text-white font-semibold">
              Delete Task
            </span>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
