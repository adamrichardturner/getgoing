'use client'

import { useState, FC, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeagueSpartan } from '@/app/fonts'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'
import getGoing from '@/public/logo/getgoing.svg'

const SignupForm: FC = () => {
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
      <div className='flex flex-col w-full h-screen px-4 sm:max-w-xl items-center justify-center gap-2'>
        {!loading ? (
          <form
            className='h-1/2 animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-2'
            onSubmit={handleSignUp}
          >
            <div className='space-y-2'>
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
              <p className='text-xxs sm:text-xs text-center text-high-contrast'>
                GetGoing revolutionizes task management with a sleek interface,
                custom categories, color coding and much more.
              </p>
            </div>
            {!successMessage ? (
              <div className='space-y-4'>
                <div className='flex flex-col'>
                  <div className='space-y-4'>
                    <div className='flex flex-col'>
                      <label className='text-xs md:text-sm' htmlFor='email'>
                        Email
                      </label>
                      <input
                        id='email'
                        className='bg-inputBar shadow-sm transition-all hover:shadow-md text-bodyText dark:placeholder-high-contrast dark:focus:placeholder-high-contrast placeholder-btnItem focus:placeholder-high-contrast w-full cursor-pointer py-3 px-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-high-contrast focus:border-none border-none ring-none focus:ring-0 rounded-lg'
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
                        Choose Password
                      </label>
                      <input
                        id='password'
                        className='bg-inputBar shadow-sm transition-all hover:shadow-md text-bodyText dark:placeholder-high-contrast dark:focus:placeholder-high-contrast placeholder-btnItem focus:placeholder-high-contrast w-full cursor-pointer py-3 px-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-high-contrast focus:border-none border-none ring-none focus:ring-0 rounded-lg'
                        type='password'
                        name='password'
                        placeholder='••••••••'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex flex-col space-y-2 pt-8'>
                  <button
                    type='submit'
                    className='bg-adamYellow w-full opacity-90 hover:opacity-100 shadow-sm hover:shadow-lg dark:hover:ring-1 ring-high-contrast transition-all text-black font-semibold outline-0 outline-black rounded-md px-4 py-3'
                  >
                    Sign Up
                  </button>
                  <div className='text-sm text-center pt-4'>
                    <Link href='/login'>
                      <p className='text-primary'>
                        Already have an account?{' '}
                        <span className='font-bold'>Sign in here</span>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center text-center pt-6 space-y-6'>
                <h3 className='text-xs'>
                  Check your email to{' '}
                  <span className='font-bold'>confirm your new account</span>{' '}
                  and sign in for the first time.
                </h3>
                <div className='text-sm text-center'>
                  <Link href='/login'>
                    <p className='text-primary text-xs'>Already confirmed?</p>
                    <span className='font-bold text-md'>
                      Go back to sign in
                    </span>
                  </Link>
                </div>
              </div>
            )}
            {errorMessage && (
              <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
                {errorMessage}
              </p>
            )}
          </form>
        ) : (
          <TasksLoadingAnimation />
        )}
        <footer className='mb-4'>
          <h3 className='text-center text-xxs text-high-contrast'>
            © Copyright {new Date().getFullYear()}
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

export default SignupForm
