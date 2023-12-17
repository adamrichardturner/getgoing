'use client'

import { useState, FC, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { LeagueSpartan } from '@/app/fonts'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'
import getGoing from '@/public/logo/getgoing.svg'

const SignupForm: FC = () => {
  const { theme } = useTheme()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Error signing up')
      }

      setSuccessMessage(data.message)
      setLoading(false)
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
      <div className='flex flex-col w-full h-screen px-8 sm:max-w-xl items-center justify-center gap-2'>
        {!loading ? (
          <form
            className='h-1/2 animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-2'
            onSubmit={handleSignUp}
          >
            <div className='space-y-1'>
              <div className='flex flex-row items-center justify-center space-x-2 pb-0'>
                <div className='w-14 h-14 md:w-18 md:h-18 relative py-0'>
                  <Image src={getGoing} fill alt='GetGoing' priority />
                </div>

                <h1
                  className={`${LeagueSpartan.className} text-4xl md:text-5xl font-semibold text-center`}
                >
                  GetGoing
                </h1>
              </div>
            </div>
            {!successMessage ? (
              <>
                <div>
                  <div className='flex flex-col'>
                    <div className='text-xs text-center'>
                      <span className='text-xs'>
                        Sign up to GetGoing!
                        <br />
                      </span>
                      <span>
                        You are one step away from a more organised life
                      </span>
                    </div>
                    <label className='text-xs md:text-sm' htmlFor='email'>
                      Email
                    </label>
                    <input
                      id='email'
                      className='rounded-md px-4 py-2 bg-inherit border outline-primary mb-4'
                      type='email'
                      name='email'
                      placeholder='you@example.com'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <button
                    type='submit'
                    className='bg-slate-200 hover:bg-slate-500 hover:text-white transition-colors dark:bg-slate-900 dark:hover:bg-slate-600 text-black dark:text-white outline-1 outline-black border rounded-md px-4 py-2 mb-1'
                  >
                    Sign Up
                  </button>
                  <p className='text-sm text-center mt-4'>
                    <Link href='/login'>
                      <p className='text-primary hover:text-btn'>
                        Already have an account?{' '}
                        <span className='font-bold'>Sign in here</span>
                      </p>
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <div className='flex flex-col justify-center items-center text-center mt-4'>
                <h2>Check your email to confirm your new account</h2>
                <p className='text-sm text-center'>
                  <Link href='/login'>
                    <p className='text-primary hover:text-btn'>
                      Already have an account?{' '}
                      <span className='font-bold'>Sign in here</span>
                    </p>
                  </Link>
                </p>
              </div>
            )}
            {errorMessage && (
              <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
                {errorMessage}
              </p>
            )}
          </form>
        ) : (
          <TasksLoadingAnimation isLightMode={theme === 'light'} />
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

export default SignupForm
