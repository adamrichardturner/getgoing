"use client"

import { format } from "date-fns"
import { useState } from "react"
import { formatDateToUK } from "@/utils/formatDate"
import { HiOutlineEllipsisHorizontalCircle } from "react-icons/hi2"
import useTodos from "@/hooks/todos"
import { Button } from "@/components/ui/button"
import { TitleInput } from "./TitleInput"
import { Todo } from "@/types/Todo"
import ColorPicker from "../ColorPicker"
import { CategorySelect } from "./CategorySelect"
import { DatePicker } from "./DatePicker/DatePicker"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PreFormTodo } from "@/types/Todo"
import FormLoadingAnimation from "@/common/FormLoadingAnimation"
import { toast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@uidotdev/usehooks"

export function TaskContextMenu({ todo, id }: { todo: Todo; id: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleDeleteTask, handlePatchTodo, loadTodos } = useTodos()
  const [newCategory, setNewCategory] = useState<number>(
    todo.category_id ? todo.category_id : 999
  )
  const smallScreen = useMediaQuery("only screen and (max-width : 768px)")

  const [newColor, setNewColor] = useState<string>(todo.color ? todo.color : "")

  const initialDueDate = todo.due_date ? new Date(todo.due_date) : null
  const [newDueDate, setNewDueDate] = useState<Date | null>(initialDueDate)
  const [formattedDate, setFormattedDate] = useState<string>(
    formatDateToUK(todo.due_date)
  )
  const [newTitle, setNewTitle] = useState<string>(todo.content)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleDelete = async (id: number) => {
    setIsLoading(true)
    try {
      const data = await handleDeleteTask(id)
      if (data) {
        toast({
          title: `Task with ID ${id} deleted successfully`,
        })
      }
    } catch (error: any) {
      toast({
        title: `Task with ID ${id} failed to be delete`,
      })
    } finally {
      setDropdownOpen(false)
      setIsLoading(false)
    }
  }

  const handleDateSelect = (newDate: Date | null) => {
    const dateValue = newDate || null
    setNewDueDate(dateValue)

    setFormattedDate(newDate ? format(newDate, "PPP") : "")
  }

  const handleColorSelect = (newColor: string) => {
    setNewColor(newColor)
  }

  const newTaskData: PreFormTodo = {
    category_id: newCategory,
    content: newTitle,
    due_date: newDueDate,
    color: newColor,
    completed: todo.completed,
    id: todo.id,
  }

  const handleEditTodo = async () => {
    setIsLoading(true)
    try {
      await handlePatchTodo(todo.id, newTaskData)
      await loadTodos()
    } catch (error) {
      console.error(error)
    } finally {
      setDropdownOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={dropdownOpen} onOpenChange={setDropdownOpen} modal>
      <DialogTrigger asChild>
        <div
          className={`${
            smallScreen ? "items-center" : ""
          } 'bg-transparent p-0 shadow-none outline-none border-none flex items-end'`}
        >
          <HiOutlineEllipsisHorizontalCircle />
        </div>
      </DialogTrigger>
      <DialogContent className="DialogContent max-w-xs sm:max-w-sm m-4">
        <DialogHeader>
          <DialogTitle className="space-y-1">
            <span className="text-xl">Edit Task</span>
            <span className="text-xs font-regular text-bodyText relative flex flex-col items-center sm:items-start">
              Created: {formatDateToUK(todo.created_at ?? "")}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label htmlFor="colorPicker" className="text-xs">
              Change Task Colour
            </label>
            <ColorPicker
              loading={isLoading}
              selectedColor={newColor}
              handleColorSelect={handleColorSelect}
            />
          </div>
          <div>
            <label htmlFor="editTask" className="text-xs">
              Change Title
            </label>
            <TitleInput newTitle={newTitle} setNewTitle={setNewTitle} />
          </div>
          <div>
            <label
              htmlFor="catDropdown"
              className="text-xs border-0 outine-0 mb-0"
            >
              Change Category
            </label>
            <CategorySelect setNewCategory={setNewCategory} id={id} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="editDueDate" className="text-xs">
              Change Due Date
            </label>
            <DatePicker
              date={newDueDate ? newDueDate : ""}
              onSelect={handleDateSelect}
              formattedDate={formattedDate}
            />
          </div>
        </div>
        {!isLoading ? (
          <div className="min-h-[100px]">
            <Button
              type="submit"
              className="bg-default-color mb-2 w-full text-white mt-4"
              onClick={() => handleEditTodo()}
            >
              Update
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-800 w-full rounded-md cursor-pointer flex flex-row items-center justify-center text-center py-2 px-2"
              onClick={() => handleDelete(todo.id)}
            >
              <span className="text-sm text-white font-semibold">
                Delete Task
              </span>
            </Button>
          </div>
        ) : (
          <FormLoadingAnimation />
        )}
      </DialogContent>
    </Dialog>
  )
}
