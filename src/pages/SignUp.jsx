import React from 'react'
import { AuthComponent } from '../components/ui/sign-up'
import { Gem } from 'lucide-react'

const SignUpLogo = () => (
  <div className="bg-primary text-primary-foreground rounded-md p-1.5">
    <Gem className="h-4 w-4" />
  </div>
)

export const SignUp = ({ onSuccess, onSwitchToSignIn }) => {
  return (
    <AuthComponent 
      logo={<SignUpLogo />} 
      brandName="CrowdLocal"
      onSuccess={onSuccess}
      isSignUp={true}
    />
  )
}

export default SignUp
