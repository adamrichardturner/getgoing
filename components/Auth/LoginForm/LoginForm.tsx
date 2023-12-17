'use client'

import { useState, FC, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { LeagueSpartan } from '@/app/fonts'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'
import getGoing from '@/public/logo/getgoing.svg'
import useMyAuth from '../../../hooks/auth/index'

const LoginForm: FC = () => {
  const { user, updateUser } = useMyAuth()
  const authed = user?.aud === 'authenticated'
  const { theme } = useTheme()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (authed) {
      router.push('/')
    } else {
      setLoading(false)
    }
  }, [router, authed])

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
      if (user) {
        await router.push('/')
        setLoading(false)
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unexpected error occurred.')
      }
      setLoading(false)
    }
  }

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='flex flex-col w-full min-h-screen px-8 sm:max-w-xl items-center justify-center gap-2'>
        {loading || user?.aud ? (
          <TasksLoadingAnimation isLightMode={theme === 'light'} />
        ) : (
          <form
            className='animate-in h-1/2 flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-2'
            onSubmit={handleSignIn}
            autoComplete='on'
          >
            <div className='space-y-1'>
              <div className='flex flex-row items-center justify-center space-x-2'>
                <div className='w-14 h-14 md:w-18 md:h-18 relative'>
                  <Image src={getGoing} fill alt='GetGoing Logo' priority />
                </div>

                <h1
                  className={`${LeagueSpartan.className} text-4xl md:text-5xl font-semibold text-center`}
                >
                  GetGoing
                </h1>
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <div className='text-xs text-center'>
                  <span className='text-xs'>
                    Try the app with Demo Account:
                    <br />
                    <span className='font-semibold'>demo@example.com</span>
                  </span>{' '}
                  <span className='text-xs'>
                    Password: <span className='font-semibold'>demo</span>
                  </span>
                </div>
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
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
                className='bg-slate-200 hover:bg-slate-500 hover:text-white transition-colors dark:bg-slate-900 dark:hover:bg-slate-600 text-black dark:text-white outline-1 outline-black border rounded-md px-4 py-2 mb-1'
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
        )}
        <footer>
          <a
            className='font-semibold'
            href='https://adamrichardturner.dev'
            target='_blank'
          >
            <h3 className='text-high-contrast hover:text-btn mb-2'>
              GetGoing | Made by Adam Turner
            </h3>
          </a>
        </footer>
      </div>
    </section>
  )
}

export default LoginForm
