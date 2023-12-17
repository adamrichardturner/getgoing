import React, { FC } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'

const GoogleSignInButton: FC = () => {
  const supabaseClient = createClientComponentClient()

  const handleGoogleSignIn = async () => {
    // Check if signInWithRedirect is being called
    try {
      await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://getgoingapp.io',
        },
      })
      console.log('User signed in with Google')
    } catch (error) {
      console.error('Error signing in with Google:', error)
      return
    }
  }

  return (
    <Button variant='outline' onClick={handleGoogleSignIn}>
      Sign in with Google
    </Button>
  )
}

export default GoogleSignInButton
