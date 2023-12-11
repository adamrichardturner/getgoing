'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import useTodos from '@/hooks/todos'

export function SearchDialog() {
  const { updateSearchTerm } = useTodos()
  return (
    <div className="translate-x-2/4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-9 px-0 border border-white shadow-md rounded-lg text-white hover:text-primary"
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="w-4 px-0 group-hover:text-primary"
            />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search To Dos</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2 m-2 ">
            <div className="grid flex-1 gap-2">
              <Input
                id="link"
                onChange={(e) => updateSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
