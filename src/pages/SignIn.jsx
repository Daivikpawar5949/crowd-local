import React from 'react'
import { AuthComponent } from '../components/ui/sign-up'
import { Gem } from 'lucide-react'

const SignInLogo = () => (
  <div className="bg-primary text-primary-foreground rounded-md p-1.5">
    <Gem className="h-4 w-4" />
  </div>
)

export const SignIn = ({ onSuccess, onSwitchToSignUp }) => {
  return (
    <AuthComponent 
      logo={<SignInLogo />} 
      brandName="CrowdLocal"
      onSuccess={onSuccess}
      isSignUp={false}
    />
  )
}

export default SignIn
