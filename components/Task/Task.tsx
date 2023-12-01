'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle,
  faCircleCheck,
  faBell,
  faDroplet
} from '@fortawesome/free-solid-svg-icons'

const Task = () => {
  return (
    <article className="bg-task hover:bg-darktask w-full flex flex-row justify-between shadow-sm hover:shadow-md cursor-pointer rounded-lg py-5 px-3">
      <div className="flex flex-row items-center space-x-2">
        <div>
          <FontAwesomeIcon icon={faCircle} className="text-slate-400" />
        </div>
        <div className="flex flex-col">
          <div>
            <p>Sort out Dark Mode colour scheme! 🤯</p>
          </div>
          <div className="flex flex-row text-xs space-x-2">
            <div className="font-regular">Important Tasks</div>
            <div className="flex flex-row space-x-1">
              <span>
                <FontAwesomeIcon icon={faBell} />
              </span>
              <p>Due 01/12/2023</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <FontAwesomeIcon icon={faDroplet} />
        </div>
      </div>
    </article>
  )
}

export default Task
