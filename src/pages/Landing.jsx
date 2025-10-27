import React from 'react'
import { HeroGeometric } from '../components/ui/shape-landing-hero'

export const Landing = ({ onGetStarted }) => {
  return (
    <HeroGeometric
      badge="CrowdLocal"
      title1="Elevate Your"
      title2="Crowdfunding Vision"
      onGetStarted={onGetStarted}
    />
  )
}

export default Landing
