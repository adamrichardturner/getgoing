"use client"

import { FC, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MdClose } from "react-icons/md"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faCircle as fasCircle } from "@fortawesome/free-solid-svg-icons"
import { faCircle as farCircle } from "@fortawesome/free-regular-svg-icons"
import useCategories from "@/hooks/categories"
import useTodos from "@/hooks/todos"
import { Category } from "@/types/Category"
import useMyTheme from "@/hooks/theme"
import DisableBodyScroll from "../DisableBodyScroll"
import { CategoryDrawerAdder } from "./CategoryDrawerAdder"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import CategoryCard from "../Category/CategoryCard"
import { useMediaQuery } from "@uidotdev/usehooks"
import MobileMenuButton from "../MobileMenuButton"

const CategoriesDrawer: FC = () => {
  const {
    categories,
    updateCategoryChosen,
    selectedCategory,
    renameCategory,
    removeCategory,
  } = useCategories()

  const { todos } = useTodos()
  const smallScreen = useMediaQuery("only screen and (max-width : 800px)")
  const { isDrawerOpen, updateDrawerOpen, switchDrawerOpen }: any = useMyTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editedCategory, setEditedCategory] = useState<any>({
    id: null,
    name: "",
  })

  useEffect(() => {
    if (smallScreen) {
      updateDrawerOpen(false)
    }

    if (smallScreen && isDrawerOpen) {
      updateDrawerOpen(false)
    } else if (!smallScreen && !isDrawerOpen) {
      updateDrawerOpen(true)
    }
  }, [smallScreen])

  const validateForm = (str: string) => {
    if (str.trim().length < 3) {
      return false
    } else if (str.trim().length > 33) {
      return false
    }
    return true
  }

  function isPayloadActionWithMessage(
    response: any
  ): response is { payload: { message: string } } {
    return (
      response &&
      response.payload &&
      typeof response.payload.message === "string"
    )
  }

  const handleSubmitEdit = async () => {
    setIsLoading(true)
    if (!editedCategory.id) return
    try {
      if (!validateForm(editedCategory.name))
        throw new Error(
          "Category name must be greater than 3 characters and less than 33 in length."
        )
      const response = await renameCategory(editedCategory)
      if (isPayloadActionWithMessage(response)) {
        toast({
          title: "Success",
          description: response.payload.message,
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Failed to edit category",
          description: error.message,
        })
      }
    } finally {
      setEditedCategory({ id: null, name: "" })
      setIsLoading(false)
      setEditMode(false)
    }
  }

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      setIsLoading(true)
      await removeCategory(categoryId)
    } catch (error) {
      console.error(error)
    } finally {
      setEditedCategory({ id: null, name: "" })
      setEditMode(false)
      setIsLoading(false)
    }
  }

  const handleEditModeToggle = () => {
    setEditedCategory({ id: null, name: "" })
    setEditMode(!editMode)
  }

  const variants = {
    open: {
      width: "16rem",
      transform: "translateX(0)",
      zIndex: 6,
      bottom: 0,
      top: "60px",
      left: 0,
    },
    closed: {
      transform: "translateX(-100%)",
      zIndex: 6,
      bottom: 0,
      top: "60px",
      left: 0,
    },
  }

  const handleBackdropClick = () => updateDrawerOpen(false)

  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
    if (smallScreen) updateDrawerOpen(false)
  }

  const handleDrawer = () => {
    isDrawerOpen ? updateDrawerOpen(false) : updateDrawerOpen(true)
  }

  const renderCategorySkeletons = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="my-2 w-full h-8" />
    ))

  const renderCategories = () =>
    isLoading
      ? renderCategorySkeletons()
      : categories.slice(0, 7).map((category: Category) => {
          if (!category.id) return null
          return (
            <CategoryCard
              key={category.id}
              category={category}
              editedCategory={editedCategory}
              editMode={editMode}
              handleSubmitEdit={handleSubmitEdit}
              setEditedCategory={setEditedCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          )
        })

  return (
    <>
      {isDrawerOpen && smallScreen && (
        <>
          <DisableBodyScroll />
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-6"
            onClick={handleBackdropClick}
          >
            {isDrawerOpen && smallScreen && (
              <div
                className="text-white z-20 text-2xl fixed top-[72px] right-2.5 transition-all"
                onClick={handleDrawer}
              >
                <MdClose />
              </div>
            )}
          </div>
        </>
      )}
      <MobileMenuButton />
      <motion.div
        id="sidebar"
        className={`h-[calc(100lvh-60px)] bg-drawer flex flex-col items-between overflow-hidden z-6 fixed shadow-md`}
        variants={variants}
        initial={smallScreen ? "closed" : "open"}
        animate={isDrawerOpen ? "open" : "closed"}
        transition={{ type: "spring", ease: "easeInOut", duration: 0.3 }}
      >
        {isLoading ? (
          <div className="flex w-full min-h-full flex-col items-between overflow-y-auto bg-drawer pb-4">
            {renderCategorySkeletons()}
          </div>
        ) : (
          <div className="flex flex-col items-end h-full relative">
            <div className="flex w-full h-full min-h-full flex-col items-between justify-between overflow-y-auto bg-drawer pb-4">
              <div className="space-y-0">
                <div className="flex flex-col">
                  <div className="min-h-[38px] flex flex-row items-end">
                    {isDrawerOpen && !smallScreen && (
                      <button
                        className="self-start ml-auto pl-4 pr-4 pt-burgerTop text-bodyText text-xl relative bottom-burgerBottom cursor-pointer icon-fade"
                        onClick={handleDrawer}
                      >
                        <FontAwesomeIcon icon={faBars} />
                      </button>
                    )}
                  </div>

                  <h2
                    className={`self-end mr-auto px-4 font-regular text-xl text-high-contrast pb-2 ${
                      smallScreen ? "pt-catTopMob" : "pt-catTop"
                    } `}
                  >
                    Categories
                  </h2>
                </div>

                {!editMode && (
                  <li
                    key={999}
                    onClick={() => handleCategoryClick(999)}
                    className={`flex flex-row justify-between px-4 py-3 rounded cursor-pointer text-sm w-full ${
                      selectedCategory === 999
                        ? "bg-itemHover hover:bg-itemHover text-primary font-regular"
                        : "hover:bg-itemHover text-bodyText font-light hover:text-primary"
                    }`}
                  >
                    <div className="space-x-2 flex flex-row items-center">
                      {selectedCategory === 999 ? (
                        <FontAwesomeIcon
                          icon={fasCircle}
                          style={{ color: "var(--highlight)" }}
                        />
                      ) : (
                        <FontAwesomeIcon icon={farCircle} />
                      )}
                      <span className="leading-tight text-high-contrast">
                        All Tasks
                      </span>
                    </div>
                    <span>
                      {todos.filter((todo) => !todo.completed).length}
                    </span>
                  </li>
                )}

                <ul>{renderCategories()}</ul>
              </div>
              <div className="w-full px-4 pb-0 space-y-3">
                {editMode && categories.length < 7 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CategoryDrawerAdder
                      handleEditModeToggle={handleEditModeToggle}
                    />
                  </motion.div>
                )}
                <div className="flex items-center justify-start space-x-2 pb-0">
                  <Switch
                    checked={editMode}
                    onCheckedChange={handleEditModeToggle}
                    className={
                      editMode
                        ? "bg-high-contrast"
                        : "bg-slate-400 dark:bg-slate-200"
                    }
                  />
                  <span className="text-high-contrast text-xs">
                    Edit Categories
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default CategoriesDrawer
