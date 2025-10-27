import React, { useState } from 'react'
import { X, AlertCircle } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const CreateProject = ({ user, token, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    goal: '',
    daysRemaining: '',
    category: 'Tech'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (!formData.title || !formData.tagline || !formData.description || !formData.goal || !formData.daysRemaining) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (formData.goal < 1000) {
      setError('Funding goal must be at least $1,000')
      setLoading(false)
      return
    }

    if (formData.daysRemaining < 1 || formData.daysRemaining > 365) {
      setError('Days remaining must be between 1 and 365')
      setLoading(false)
      return
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch(`${API_BASE}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          tagline: formData.tagline,
          description: formData.description,
          goal: parseInt(formData.goal),
          daysRemaining: parseInt(formData.daysRemaining),
          category: formData.category
        }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create project')
      }

      console.log('✅ Project created:', data.project)
      onSuccess(data.project)
      onClose()
    } catch (err) {
      console.error('❌ Create project error:', err.message)
      if (err.name === 'AbortError') {
        setError('Backend not responding. Please check your internet and try again.')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-xl border border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/95">
          <h1 className="text-2xl font-bold text-white">Create Your Project</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-950/30 border border-red-800/50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., EcoTech Solar"
              className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-600 transition-colors"
            />
            <p className="text-xs text-slate-400 mt-1">Give your project a clear, compelling name</p>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="e.g., Affordable solar energy for homes"
              className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-600 transition-colors"
            />
            <p className="text-xs text-slate-400 mt-1">One sentence summary (shown in listings)</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell supporters about your project..."
              rows="4"
              className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-600 transition-colors resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">Describe your project, the problem it solves, and why it matters</p>
          </div>

          {/* Funding Goal */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Funding Goal ($)</label>
            <input
              type="number"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="50000"
              min="1000"
              step="1000"
              className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-600 transition-colors"
            />
            <p className="text-xs text-slate-400 mt-1">Minimum $1,000</p>
          </div>

          {/* Days Remaining */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Campaign Duration (Days)</label>
              <input
                type="number"
                name="daysRemaining"
                value={formData.daysRemaining}
                onChange={handleChange}
                placeholder="30"
                min="1"
                max="365"
                className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-600 transition-colors"
              />
              <p className="text-xs text-slate-400 mt-1">1-365 days</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-600 transition-colors"
              >
                <option value="Tech">Tech</option>
                <option value="Design">Design</option>
                <option value="Community">Community</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex-1 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 rounded-lg text-white font-medium transition-all",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
