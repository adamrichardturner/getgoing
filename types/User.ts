// Interface for the User object
export interface User {
  id: string
  aud: string
  role: string | undefined
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: {
    provider: string
    providers: string[]
  }
  user_metadata: Record<string, unknown>
  identities: Array<{
    id: string
    user_id: string
    identity_data: Record<string, unknown>
    provider: string
    last_sign_in_at: string
    created_at: string
    updated_at: string
  }>
  created_at: string
  updated_at: string
}
