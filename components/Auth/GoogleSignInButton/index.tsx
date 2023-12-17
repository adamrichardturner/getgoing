import React, { FC } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const GitHubSignInButton: FC = () => {
  const supabaseClient = createClientComponentClient()

  const handleGitHubSignIn = async () => {
    try {
      await supabaseClient.auth.signInWithOAuth({
        provider: 'github',
      })
      console.log('User signed in with GitHub')
    } catch (error) {
      console.error('Error signing in with GitHub:', error)
      return
    }
  }

  return (
    <Button variant='outline' onClick={handleGitHubSignIn}>
      <FontAwesomeIcon icon={faGithub} />
      Sign in with GitHub
    </Button>
  )
}

export default GitHubSignInButton
