import { Suspense, lazy, useState, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export function SplineScene({ scene, className }) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reset states when scene URL changes
    setError(false)
    setIsLoading(true)
  }, [scene])

  const handleError = (err) => {
    console.error('Spline scene error:', err)
    setError(true)
    setIsLoading(false)
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-border">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-2xl">🎨</div>
          <p className="text-sm text-foreground/60">3D scene unavailable</p>
          <p className="text-xs text-foreground/40">Check your connection and try again</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-foreground/5 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
            <span className="text-xs text-foreground/60">Loading 3D scene...</span>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
      />
    </Suspense>
  )
}
