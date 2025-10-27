import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo, useCallback, createContext, Children } from "react"
import { cva } from "class-variance-authority"
import { ArrowRight, Mail, Gem, Lock, Eye, EyeOff, ArrowLeft, X, AlertCircle, PartyPopper, Loader } from "lucide-react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import confetti from "canvas-confetti"
import { cn } from "../../lib/cn"

// --- DOODLE EYES COMPONENT ---
const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY
}) => {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const eyeRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 }

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY }
    }

    const eye = eyeRef.current.getBoundingClientRect()
    const eyeCenterX = eye.left + eye.width / 2
    const eyeCenterY = eye.top + eye.height / 2

    const deltaX = mouseX - eyeCenterX
    const deltaY = mouseY - eyeCenterY
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance)

    const angle = Math.atan2(deltaY, deltaX)
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance

    return { x, y }
  }

  const pupilPosition = calculatePupilPosition()

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
        border: '2px solid rgba(0,0,0,0.1)',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  )
}

// --- CONFETTI LOGIC ---
const ConfettiContext = createContext({})

const Confetti = forwardRef(({ options, globalOptions = { resize: true, useWorker: true }, manualstart = false, ...rest }, ref) => {
  const instanceRef = useRef(null)
  const canvasRef = useCallback((node) => {
    if (node !== null) {
      if (instanceRef.current) return
      instanceRef.current = confetti.create(node, { ...globalOptions, resize: true })
    } else {
      if (instanceRef.current) {
        instanceRef.current.reset()
        instanceRef.current = null
      }
    }
  }, [globalOptions])
  const fire = useCallback((opts = {}) => instanceRef.current?.({ ...options, ...opts }), [options])
  const api = useMemo(() => ({ fire }), [fire])
  useImperativeHandle(ref, () => api, [api])
  useEffect(() => { if (!manualstart) fire() }, [manualstart, fire])
  return <canvas ref={canvasRef} {...rest} />
})
Confetti.displayName = "Confetti"

// --- TEXT LOOP ANIMATION COMPONENT ---
export function TextLoop({ children, className, interval = 2, transition = { duration: 0.3 }, variants, onIndexChange, stopOnEnd = false }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = Children.toArray(children)
  useEffect(() => {
    const intervalMs = interval * 1000
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        if (stopOnEnd && current === items.length - 1) {
          clearInterval(timer)
          return current
        }
        const next = (current + 1) % items.length
        onIndexChange?.(next)
        return next
      })
    }, intervalMs)
    return () => clearInterval(timer)
  }, [items.length, interval, onIndexChange, stopOnEnd])
  const motionVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }
  return (
    <div className={cn('relative inline-block whitespace-nowrap', className)}>
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.div key={currentIndex} initial='initial' animate='animate' exit='exit' transition={transition} variants={variants || motionVariants}>
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// --- BUILT-IN BLUR FADE ANIMATION COMPONENT ---
export function BlurFade({ children, className, variant, duration = 0.4, delay = 0, yOffset = 6, inView = true, inViewMargin = "-50px", blur = "6px" }) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult
  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  }
  const combinedVariants = variant || defaultVariants
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} exit="hidden" variants={combinedVariants} transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  )
}

// --- BUILT-IN GLASS BUTTON COMPONENT ---
const glassButtonVariants = cva("relative isolate all-unset cursor-pointer rounded-full transition-all", { variants: { size: { default: "text-base font-medium", sm: "text-sm font-medium", lg: "text-lg font-medium", icon: "h-10 w-10" } }, defaultVariants: { size: "default" } })
const glassButtonTextVariants = cva("glass-button-text relative block select-none tracking-tighter", { variants: { size: { default: "px-6 py-3.5", sm: "px-4 py-2", lg: "px-8 py-4", icon: "flex h-10 w-10 items-center justify-center" } }, defaultVariants: { size: "default" } })

export const GlassButton = React.forwardRef(({ className, children, size, contentClassName, onClick, ...props }, ref) => {
  const handleWrapperClick = (e) => {
    const button = e.currentTarget.querySelector('button')
    if (button && e.target !== button) button.click()
  }
  return (
    <div className={cn("glass-button-wrap cursor-pointer rounded-full relative", className)} onClick={handleWrapperClick}>
      <button className={cn("glass-button relative z-10", glassButtonVariants({ size }))} ref={ref} onClick={onClick} {...props}>
        <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>{children}</span>
      </button>
      <div className="glass-button-shadow rounded-full pointer-events-none"></div>
    </div>
  )
})
GlassButton.displayName = "GlassButton"

// --- THEME-AWARE SVG GRADIENT BACKGROUND ---
const GradientBackground = () => (
    <>
        <style>
            {` @keyframes float1 { 0% { transform: translate(0, 0); } 50% { transform: translate(-10px, 10px); } 100% { transform: translate(0, 0); } } @keyframes float2 { 0% { transform: translate(0, 0); } 50% { transform: translate(10px, -10px); } 100% { transform: translate(0, 0); } } `}
        </style>
        <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute top-0 left-0 w-full h-full">
            <defs>
                <linearGradient id="rev_grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: 'var(--color-primary)', stopOpacity:0.8}} /><stop offset="100%" style={{stopColor: 'var(--color-chart-3)', stopOpacity:0.6}} /></linearGradient>
                <linearGradient id="rev_grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: 'var(--color-chart-4)', stopOpacity:0.9}} /><stop offset="50%" style={{stopColor: 'var(--color-secondary)', stopOpacity:0.7}} /><stop offset="100%" style={{stopColor: 'var(--color-chart-1)', stopOpacity:0.6}} /></linearGradient>
                <radialGradient id="rev_grad3" cx="50%" cy="50%" r="50%"><stop offset="0%" style={{stopColor: 'var(--color-destructive)', stopOpacity:0.8}} /><stop offset="100%" style={{stopColor: 'var(--color-chart-5)', stopOpacity:0.4}} /></radialGradient>
                <filter id="rev_blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35"/></filter>
                <filter id="rev_blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25"/></filter>
                <filter id="rev_blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="45"/></filter>
            </defs>
            <g style={{ animation: 'float1 20s ease-in-out infinite' }}>
                <ellipse cx="200" cy="500" rx="250" ry="180" fill="url(#rev_grad1)" filter="url(#rev_blur1)" transform="rotate(-30 200 500)"/>
                <rect x="500" y="100" width="300" height="250" rx="80" fill="url(#rev_grad2)" filter="url(#rev_blur2)" transform="rotate(15 650 225)"/>
            </g>
            <g style={{ animation: 'float2 25s ease-in-out infinite' }}>
                <circle cx="650" cy="450" r="150" fill="url(#rev_grad3)" filter="url(#rev_blur3)" opacity="0.7"/>
                <ellipse cx="50" cy="150" rx="180" ry="120" fill="var(--color-accent)" filter="url(#rev_blur2)" opacity="0.8"/>
            </g>
        </svg>
    </>
)

// --- ICONS ---
const GoogleIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6"> <g fillRule="evenodd" fill="none"> <g fillRule="nonzero" transform="translate(3, 2)"> <path fill="#4285F4" d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"></path> <path fill="#34A853" d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"></path> <path fill="#FBBC05" d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"></path> <path fill="#EB4335" d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"></path> </g> </g></svg> )
const GitHubIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-6 h-6"> <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/> </svg> )

const modalSteps = [
    { message: "Signing you up...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
    { message: "Onboarding you...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
    { message: "Finalizing...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
    { message: "Welcome Aboard!", icon: <PartyPopper className="w-12 h-12 text-green-500" /> }
]
const TEXT_LOOP_INTERVAL = 1.5

const DefaultLogo = () => ( <div className="bg-primary text-primary-foreground rounded-md p-1.5"> <Gem className="h-4 w-4" /> </div> )

// --- MAIN COMPONENT ---
export const AuthComponent = ({ logo = <DefaultLogo />, brandName = "CrowdLocal", onSuccess, isSignUp = true }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [authStep, setAuthStep] = useState(isSignUp ? "name" : "email")
  const [modalStatus, setModalStatus] = useState('closed')
  const [modalErrorMessage, setModalErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const confettiRef = useRef(null)

  const isNameValid = name.trim().length >= 2
  const isEmailValid = /\S+@\S+\.\S+/.test(email)
  const isPasswordValid = password.length >= 6
  const isConfirmPasswordValid = confirmPassword.length >= 6
  
  const passwordInputRef = useRef(null)
  const confirmPasswordInputRef = useRef(null)
  const nameInputRef = useRef(null)
  
  const fireSideCanons = () => {
    const fire = confettiRef.current?.fire
    if (fire) {
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }
        const particleCount = 50
        fire({ ...defaults, particleCount, origin: { x: 0, y: 1 }, angle: 60 })
        fire({ ...defaults, particleCount, origin: { x: 1, y: 1 }, angle: 120 })
    }
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    if (modalStatus !== 'closed') return
    if (isSignUp && authStep !== 'confirmPassword') return
    if (!isSignUp && authStep !== 'password') return

    if (isSignUp && password !== confirmPassword) {
        setModalErrorMessage("Passwords do not match!")
        setModalStatus('error')
        return
    }

    setModalStatus('loading')
    setIsLoading(true)

    const loadingStepsCount = modalSteps.length - 1
    
    try {
      // Call the onSuccess callback with credentials
      // This will trigger the API call in App.jsx
      if (isSignUp) {
        await onSuccess(name, email, password)
      } else {
        await onSuccess(email, password)
      }
      
      setTimeout(() => {
          setModalStatus('success')
          fireSideCanons()
          setTimeout(() => {
              setModalStatus('closed')
              setName('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
              setAuthStep(isSignUp ? 'name' : 'email')
              setIsLoading(false)
          }, 3000)
      }, 500)
    } catch (error) {
      console.error('Auth error:', error)
      setModalErrorMessage(error.message || 'Authentication failed')
      setModalStatus('error')
      setIsLoading(false)
    }
  }

  const handleProgressStep = () => {
    if (isSignUp) {
      if (authStep === 'name' && isNameValid) {
        setAuthStep('email')
        setTimeout(() => {}, 300)
      } else if (authStep === 'email' && isEmailValid) {
        setAuthStep('password')
        setTimeout(() => {
          passwordInputRef.current?.focus()
        }, 300)
      } else if (authStep === 'password' && isPasswordValid) {
        setAuthStep('confirmPassword')
        setTimeout(() => {
          confirmPasswordInputRef.current?.focus()
        }, 300)
      }
    } else {
      if (authStep === 'email' && isEmailValid) {
        setAuthStep('password')
        setTimeout(() => {
          passwordInputRef.current?.focus()
        }, 300)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (authStep === (isSignUp ? 'confirmPassword' : 'password')) {
        handleFinalSubmit(e)
      } else {
        handleProgressStep()
      }
    } else if (e.key === 'Escape') {
      if (modalStatus !== 'closed') {
        setModalStatus('closed')
      }
    }
  }

  const handleGoBack = () => {
    if (isSignUp) {
      if (authStep === 'email') {
        setAuthStep('name')
      } else if (authStep === 'password') {
        setAuthStep('email')
      } else if (authStep === 'confirmPassword') {
        setAuthStep('password')
      }
    } else {
      if (authStep === 'password') {
        setAuthStep('email')
      }
    }
  }

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden flex items-center justify-center">
      <Confetti ref={confettiRef} />
      <GradientBackground />
      
      <div className="relative z-20 w-full max-w-md px-4">
        <BlurFade className="w-full text-center mb-12">
          {/* Doodle Eyes */}
          <div className="flex justify-center gap-6 mb-8">
            <EyeBall 
              size={56} 
              pupilSize={18} 
              maxDistance={12}
              eyeColor="rgba(127, 0, 255, 0.1)"
              pupilColor="#7F00FF"
            />
            <EyeBall 
              size={56} 
              pupilSize={18} 
              maxDistance={12}
              eyeColor="rgba(127, 0, 255, 0.1)"
              pupilColor="#7F00FF"
            />
          </div>
          
          <div className="flex justify-center mb-4">{logo}</div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{brandName}</h1>
          <p className="text-foreground/60">Get started with Us</p>
        </BlurFade>

        <form onSubmit={handleFinalSubmit} className="space-y-6">
          <fieldset disabled={modalStatus !== 'closed'} className="space-y-4">
            <AnimatePresence>
              {isSignUp && authStep === 'name' && (
                <BlurFade key="name-field" className="w-full">
                  <div className="relative w-full">
                    <div className="glass-input-wrap w-full">
                      <div className="glass-input">
                        <span className="glass-input-text-area"></span>
                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 pl-2">
                          <Gem className="h-5 w-5 text-foreground/80 flex-shrink-0" />
                        </div>
                        <input
                          ref={nameInputRef}
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="relative z-10 h-full w-0 flex-grow bg-transparent text-foreground placeholder:text-foreground/60 focus:outline-none"
                        />
                        <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isNameValid ? "w-10 pr-1" : "w-0")}>
                          <GlassButton type="button" onClick={handleProgressStep} size="icon" aria-label="Continue" contentClassName="text-foreground/80 hover:text-foreground">
                            <ArrowRight className="w-5 h-5" />
                          </GlassButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {authStep === 'email' && (
                <BlurFade key="email-field" className="w-full">
                  <div className="relative w-full">
                    <div className="glass-input-wrap w-full">
                      <div className="glass-input">
                        <span className="glass-input-text-area"></span>
                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 pl-2">
                          <Mail className="h-5 w-5 text-foreground/80 flex-shrink-0" />
                        </div>
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="relative z-10 h-full w-0 flex-grow bg-transparent text-foreground placeholder:text-foreground/60 focus:outline-none"
                        />
                        <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isEmailValid ? "w-10 pr-1" : "w-0")}>
                          <GlassButton type="button" onClick={handleProgressStep} size="icon" aria-label="Continue" contentClassName="text-foreground/80 hover:text-foreground">
                            <ArrowRight className="w-5 h-5" />
                          </GlassButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {authStep === 'password' && (
                <BlurFade key="password-field" className="w-full">
                  <div className="relative w-full">
                    <AnimatePresence>
                      {password.length > 0 && (
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10">
                          <label className="text-xs text-muted-foreground font-semibold">Password (min 6 chars)</label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="glass-input-wrap w-[300px]">
                      <div className="glass-input">
                        <span className="glass-input-text-area"></span>
                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 pl-2">
                          {isPasswordValid ? (
                            <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)} className="text-foreground/80 hover:text-foreground transition-colors p-2 rounded-full">
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          ) : (
                            <Lock className="h-5 w-5 text-foreground/80 flex-shrink-0" />
                          )}
                        </div>
                        <input
                          ref={passwordInputRef}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="relative z-10 h-full w-0 flex-grow bg-transparent text-foreground placeholder:text-foreground/60 focus:outline-none"
                        />
                        <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isPasswordValid ? "w-10 pr-1" : "w-0")}>
                          <GlassButton type="button" onClick={handleProgressStep} size="icon" aria-label="Submit password" contentClassName="text-foreground/80 hover:text-foreground">
                            <ArrowRight className="w-5 h-5" />
                          </GlassButton>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BlurFade inView delay={0.2}>
                    <button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Go back
                    </button>
                  </BlurFade>
                </BlurFade>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {authStep === 'confirmPassword' && (
                <BlurFade key="confirm-password-field" className="w-full">
                  <div className="relative w-full">
                    <AnimatePresence>
                      {confirmPassword.length > 0 && (
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10">
                          <label className="text-xs text-muted-foreground font-semibold">Confirm Password</label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="glass-input-wrap w-[300px]">
                      <div className="glass-input">
                        <span className="glass-input-text-area"></span>
                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 pl-2">
                          {isConfirmPasswordValid ? (
                            <button type="button" aria-label="Toggle confirm password visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-foreground/80 hover:text-foreground transition-colors p-2 rounded-full">
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          ) : (
                            <Lock className="h-5 w-5 text-foreground/80 flex-shrink-0" />
                          )}
                        </div>
                        <input
                          ref={confirmPasswordInputRef}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="relative z-10 h-full w-0 flex-grow bg-transparent text-foreground placeholder:text-foreground/60 focus:outline-none"
                        />
                        <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isConfirmPasswordValid ? "w-10 pr-1" : "w-0")}>
                          <GlassButton type="submit" size="icon" aria-label="Finish sign-up" contentClassName="text-foreground/80 hover:text-foreground">
                            <ArrowRight className="w-5 h-5" />
                          </GlassButton>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BlurFade inView delay={0.2}>
                    <button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Go back
                    </button>
                  </BlurFade>
                </BlurFade>
              )}
            </AnimatePresence>
          </fieldset>
        </form>

        <AnimatePresence>
          {modalStatus !== 'closed' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
              <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative bg-card border border-border rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
                <button onClick={() => setModalStatus('closed')} className="absolute top-4 right-4 text-foreground/60 hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>

                {modalStatus === 'loading' && (
                  <div className="flex flex-col items-center gap-4">
                    <TextLoop interval={TEXT_LOOP_INTERVAL} stopOnEnd={false}>
                      {modalSteps.slice(0, -1).map((step, idx) => (
                        <div key={idx} className="text-center">
                          {step.icon}
                          <p className="text-foreground font-medium mt-3">{step.message}</p>
                        </div>
                      ))}
                    </TextLoop>
                  </div>
                )}

                {modalStatus === 'error' && (
                  <div className="flex flex-col items-center gap-4">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                    <p className="text-foreground font-medium text-center">{modalErrorMessage}</p>
                    <GlassButton onClick={() => setModalStatus('closed')} className="w-full">
                      Try Again
                    </GlassButton>
                  </div>
                )}

                {modalStatus === 'success' && (
                  <div className="flex flex-col items-center gap-4">
                    {modalSteps[modalSteps.length - 1].icon}
                    <p className="text-foreground font-medium text-center">{modalSteps[modalSteps.length - 1].message}</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
