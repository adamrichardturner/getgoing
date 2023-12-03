'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle,
  faCircleCheck,
  faBell,
  faPalette
} from '@fortawesome/free-solid-svg-icons'
import { Category } from '@/types/Category'
import { useAppSelector } from '@/lib/hooks'

const Task = ({ todo }: any) => {
  if (!todo.content) return null
  const categories = useAppSelector((state) => state.categories.items)

  function getNameFromId(id: number, array: Category[]): string | null {
    const item = array.find((obj) => obj.id === id)
    return item ? item.name : null
  }

  const category = getNameFromId(todo.category_id, categories)

  function truncateString(str: string): string {
    const maxLength = 120

    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...'
    } else {
      return str
    }
  }

  return (
    <article className="bg-task hover:bg-darktask w-full flex flex-row justify-between shadow-sm hover:shadow-md cursor-pointer rounded-lg py-5 pl-3 pr-3">
      <div className="flex flex-row items-center space-x-2">
        <div>
          <FontAwesomeIcon icon={faCircle} className="text-slate-400" />
        </div>
        <div className="flex flex-col text-bodyText">
          <div>
            <p className="text-xs xs:text-xs sm:text-sm md:text-md font-medium">
              {truncateString(todo.content)}
            </p>
          </div>
          <div className="flex flex-row text-xs space-x-2">
            <div className="font-regular text-xs xs:text-xs sm:text-xs md:text-md">
              {category}
            </div>
            {todo.due_date ? (
              <div className="flex flex-row space-x-1">
                <span>
                  <FontAwesomeIcon icon={faBell} />
                </span>
                <p className="text-xs xs:text-xs sm:text-xs md:text-md">
                  Due {todo.due_date}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex items-center text-bodyText">
        <div>
          <FontAwesomeIcon
            icon={faPalette}
            className={`text-${todo.color || 'bodyText'}`}
          />
        </div>
      </div>
    </article>
  )
}

export default Task
