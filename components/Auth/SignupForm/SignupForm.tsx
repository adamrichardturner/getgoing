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
      <div className='flex flex-col w-full h-screen px-8 sm:max-w-xl items-center justify-center gap-2'>
        {!loading ? (
          <form
            className='h-1/2 animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-2'
            onSubmit={handleSignUp}
          >
            <div className='space-y-1'>
              <div className='flex flex-row items-center justify-center space-x-2'>
                <div className='w-10 h-10 md:w-14 md:h-14 relative'>
                  <Image src={getGoing} fill alt='GetGoing' priority />
                </div>

                <h1
                  className={`${LeagueSpartan.className} text-4xl md:text-5xl font-semibold text-high-contrast text-center leading-none pt-2`}
                >
                  GetGoing
                </h1>
              </div>
            </div>
            {!successMessage ? (
              <div className='pt-4'>
                <div>
                  <div className='flex flex-col'>
                    <div className='text-xs text-center'>
                      <span className='text-xs'>
                        Sign up to GetGoing! You will receive an activation
                        email.
                      </span>
                    </div>
                    <div className='space-y-1.5'>
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

                      <div className='flex flex-col'>
                        <label
                          className='text-xs md:text-sm'
                          htmlFor='password'
                        >
                          Password
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
                </div>

                <div className='flex flex-col mt-4'>
                  <button
                    type='submit'
                    className='bg-darkBlue opacity-90 hover:opacity-100 shadow-sm hover:shadow-md hover:ring-2 hover:ring-high-contrast transition-all text-white font-semibold outline-0 outline-black rounded-md px-4 py-2 mb-1'
                  >
                    Sign Up
                  </button>
                  <div className='text-sm text-center mt-4'>
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
              <div className='flex flex-col justify-center items-center text-center mt-4'>
                <h2>Check your email to confirm your new account</h2>
                <p className='text-sm text-center'>
                  <Link href='/login'>
                    <p className='text-primary'>
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
          <TasksLoadingAnimation />
        )}
        <footer className='mb-4'>
          <h3 className='text-xs text-high-contrast'>
            © Copyright {new Date().getFullYear()} GetGoing
          </h3>
          <a
            className='font-regular'
            href='https://adamrichardturner.dev'
            target='_blank'
          >
            <h2 className='font-semibold leading-none text-high-contrast dark:text-adamYellow transition-colors'>
              Adam Richard Turner
            </h2>
          </a>
        </footer>
      </div>
    </section>
  )
}

export default SignupForm
