'use client'

import { useState, FC, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LeagueSpartan } from '@/app/fonts'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'
import getGoing from '@/public/logo/getgoing.svg'
import useMyAuth from '../../../hooks/auth/index'

const LoginForm: FC = () => {
  const { user, updateUser } = useMyAuth()
  const authed = user?.aud === 'authenticated'
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const demo_email: string = 'demo@example.com'
  const demo_password: string = 'demo'

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
      console.log(`user data in login is`, data)
      console.log(`user data in state is now `, user)
      if (user) {
        router.push('/')
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

  const handleSignInDemo = async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: demo_email, password: demo_password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error signing in')
      }

      updateUser(data)
      if (user) {
        router.push('/')
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
    <section className='bg-main flex flex-col items-center justify-center'>
      <div className='flex flex-col w-full min-h-screen px-8 sm:max-w-xl items-center justify-center gap-2'>
        {loading ? (
          <TasksLoadingAnimation />
        ) : (
          <form
            className='animate-in h-1/2 flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-2'
            onSubmit={handleSignIn}
            autoComplete='on'
          >
            <div className='space-y-1'>
              <div className='flex flex-row items-center justify-center space-x-2'>
                <div className='w-10 h-10 sm:w-14 sm:h-14 relative'>
                  <Image src={getGoing} fill alt='GetGoing App' priority />
                </div>

                <h1
                  className={`${LeagueSpartan.className} text-4xl sm:text-5xl font-semibold text-high-contrast text-center leading-none pt-2`}
                >
                  GetGoing
                </h1>
              </div>
              <h2
                className={`${LeagueSpartan.className} text-lg sm:text-2xl text-center font-semibold pt-6 leading-none text-high-contrast`}
              >
                Intelligent Task Management App 🎯
              </h2>
              <p className='text-[10px] sm:text-xs text-center text-high-contrast'>
                GetGoing revolutionizes task & project management with a sleek
                interface, custom categories, color coding and much more.
              </p>
            </div>
            <div className='space-y-2'>
              <div className='flex flex-col'>
                <label className='text-xs md:text-sm' htmlFor='email'>
                  Email
                </label>
                <input
                  id='email'
                  className='bg-inputBar shadow-sm transition-all hover:shadow-md text-bodyText dark:placeholder-high-contrast dark:focus:placeholder-high-contrast placeholder-btnItem focus:placeholder-high-contrast w-full cursor-pointer py-3 px-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-high-contrast focus:border-none border-none ring-none focus:ring-0 rounded-lg'
                  name='email'
                  placeholder='demo@example.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  disabled={loading}
                  style={{
                    background: 'var(--inputBar)',
                  }}
                />
              </div>

              <div className='flex flex-col'>
                <label className='text-xs md:text-sm' htmlFor='password'>
                  Password
                </label>
                <input
                  id='password'
                  className='bg-inputBar shadow-sm hover:shadow-md text-bodyText dark:placeholder-high-contrast dark:focus:placeholder-high-contrast placeholder-btnItem focus:placeholder-high-contrast w-full cursor-pointer py-3 px-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-high-contrast transition-all focus:border-none border-none ring-none focus:ring-0 rounded-lg'
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

            <div className='flex flex-col space-y-2'>
              <button
                type='submit'
                disabled={loading}
                className='bg-darkBlue opacity-90 hover:opacity-100 shadow-sm hover:shadow-md hover:ring-2 hover:ring-high-contrast transition-all text-white font-semibold outline-0 outline-black rounded-md px-4 py-3 mb-1'
              >
                Sign In
              </button>
              <button
                type='button'
                disabled={loading}
                className='bg-adamYellow opacity-90 hover:opacity-100 shadow-sm hover:shadow-md hover:ring-2 hover:ring-high-contrast transition-all text-black font-semibold outline-0 outline-black rounded-md px-4 py-3 mb-1'
                onClick={handleSignInDemo}
              >
                Try Demo
              </button>
              <div className='text-sm text-center pt-4'>
                <Link href='/signup'>
                  <p className='text-primary transition-colors'>
                    Don't have an account?{' '}
                    <span className='font-bold mt-2'>Sign up here</span>
                  </p>
                </Link>
              </div>
            </div>
            {errorMessage && (
              <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
                {errorMessage}
              </p>
            )}
          </form>
        )}
        <footer className='mb-4'>
          <h3 className='text-center text-xxs text-high-contrast'>
            © Copyright {new Date().getFullYear()} GetGoing
          </h3>
          <a
            className='font-regular'
            href='https://adamrichardturner.dev'
            target='_blank'
          >
            <h2 className='font-semibold text-sm leading-none text-high-contrast dark:text-adamYellow transition-colors'>
              Adam Richard Turner
            </h2>
          </a>
        </footer>
      </div>
    </section>
  )
}

export default LoginForm
