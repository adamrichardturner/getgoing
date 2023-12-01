'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faDroplet,
  faPlus,
  faBell
} from '@fortawesome/free-solid-svg-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
})

const TaskForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: ''
    }
  })

  function onSubmit(data) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <article className="bg-task hover:bg-darktask w-full flex flex-row justify-between shadow-sm hover:shadow-md cursor-pointer rounded-lg py-5 px-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <div className="flex flex-row items-center space-x-2 w-full">
            <div>
              <FontAwesomeIcon icon={faPlus} className="text-slate-400" />
            </div>
            <div className="flex flex-col w-full">
              <div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Add a task"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row text-xs space-x-2">
              <div className="font-regular items-center">Important Tasks</div>
              <div className="flex flex-row space-x-1">
                <span>
                  <FontAwesomeIcon icon={faBell} />
                </span>
                <p>Due 01/12/2023</p>
              </div>
            </div>
            <div>
              <Button type="submit">Add</Button>
            </div>
          </div>
        </form>
      </Form>
    </article>
  )
}

export default TaskForm
