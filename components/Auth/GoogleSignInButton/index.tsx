import React, { FC } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'

const GoogleSignInButton: FC = () => {
  const supabaseClient = createClientComponentClient()

  const handleGoogleSignIn = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'api/auth/callback', // Replace with your callback URL
      },
    })

    if (error) {
      console.error(error)
      return
    }

    console.log('User signed in with Google')
  }

  return (
    <Button variant='outline' onClick={handleGoogleSignIn}>
      Sign in with Google
    </Button>
  )
}

export default GoogleSignInButton
