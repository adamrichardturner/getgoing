'use client'

import { useState, useEffect, FC, FormEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation' // Corrected from 'next/navigation'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { LeagueSpartan } from '@/app/fonts'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'
import whiteEye from '@/public/logo/eye-white.png'
import blackEye from '@/public/logo/eye-black.png'
import useMyAuth from '../../../hooks/auth/index'

const LoginForm: FC = () => {
  const { user, updateUser } = useMyAuth()
  const { theme } = useTheme()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false) // Initially true
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error signing in')
      }

      updateUser(data)
      router.push('/')
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='flex flex-col w-full min-h-screen px-8 sm:max-w-xl items-center justify-center gap-2'>
        {!loading ? (
          <form
            className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-2'
            onSubmit={handleSignIn}
          >
            <div>
              <div className='flex flex-row items-center justify-center space-x-2 pb-2'>
                <div className='w-16 h-16 md:w-20 md:h-20 relative'>
                  <Image
                    src={theme === 'light' ? blackEye : whiteEye}
                    fill
                    alt='GetGoing Logo'
                    priority
                  />
                </div>

                <h1
                  className={`${LeagueSpartan.className} text-4xl md:text-5xl font-semibold text-center`}
                >
                  GetGoing
                </h1>
              </div>
              <div className='text-xs text-center'>
                <p>
                  Try out GetGoing using the following credentials or signup for
                  your own account
                </p>
                <p className='text-xs pt-2'>
                  Email: <span className='font-semibold'>demo@example.com</span>
                </p>
                <p className='text-xs'>
                  Password: <span className='font-semibold'>demo</span>
                </p>
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label className='text-xs md:text-sm' htmlFor='email'>
                  Email
                </label>
                <input
                  id='email'
                  className='rounded-md px-4 py-2 bg-inherit border outline-primary mb-4'
                  name='email'
                  placeholder='you@example.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className='flex flex-col'>
                <label className='text-xs md:text-sm' htmlFor='password'>
                  Password
                </label>
                <input
                  id='password'
                  className='rounded-md px-4 py-2 bg-inherit border outline-primary mb-0'
                  type='password'
                  name='password'
                  placeholder='••••••••'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <button
                type='submit'
                disabled={loading}
                className='bg-slate-200 dark:bg-slate-900 text-black dark:text-white outline-1 outline-black border rounded-md px-4 py-2 mb-1'
              >
                Sign In
              </button>
              <p className='text-sm text-center mt-2'>
                <Link href='/signup'>
                  <p className='text-primary hover:text-btn'>
                    Don't have an account?{' '}
                    <span className='font-bold'>Sign up</span>
                  </p>
                </Link>
              </p>
            </div>
            {errorMessage && (
              <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
                {errorMessage}
              </p>
            )}
          </form>
        ) : (
          <TasksLoadingAnimation isLightMode={theme === 'light'} />
        )}
      </div>
    </section>
  )
}

export default LoginForm
