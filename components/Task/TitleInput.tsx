"use client"
import { Input } from "@/components/ui/input"

interface TitleInputProps {
  newTitle: string
  setNewTitle: any
}

export function TitleInput({ newTitle, setNewTitle }: TitleInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  }

  return (
    <div className="flex flex-col max-w-sm items-center bg-transparent">
      <Input
        name="editTask"
        type="text"
        className="py-2 border border-itemBorder shadow focus:snap-none hover:shadow-lg bg-inputBar hover:bg-inputBarHover"
        placeholder="New Title"
        onChange={handleChange}
        value={newTitle}
        tabIndex={-1}
      />
    </div>
  )
}
