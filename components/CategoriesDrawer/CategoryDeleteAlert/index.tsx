'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Category } from '@/types/Category'

interface CategoryDeleteAlertProps {
  category: Category
  isOpen: boolean
  handleIsOpen: () => void
  handleDeleteCategory: (num: number) => void
}

const CategoryDeleteAlert = ({
  category,
  isOpen,
  handleIsOpen,
  handleDeleteCategory,
}: CategoryDeleteAlertProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={handleIsOpen}>
      <AlertDialogTrigger>
        <FontAwesomeIcon icon={faTimes} />
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[80vw]'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {category.name}?
          </AlertDialogTitle>
          <AlertDialogDescription className='py-4 m-0'>
            This action cannot be undone and will permanently delete the
            category. All associated tasks will be unassigned but not deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleIsOpen}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-alert text-white'
            onClick={() => handleDeleteCategory(category.id)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CategoryDeleteAlert
