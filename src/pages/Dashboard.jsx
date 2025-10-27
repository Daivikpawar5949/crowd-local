import React, { useState } from 'react'
import { Menu, X, Plus, ArrowLeft, User, Zap, Gem } from 'lucide-react'
import CreateProject from './CreateProject'

// Lazy load SplineSceneBasic to prevent blocking
const SplineSceneBasic = React.lazy(() => 
  import('../components/ui/demo').then(m => ({ default: m.SplineSceneBasic }))
)

// Helper function
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Dashboard = ({ user, onLogout, token }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'EcoTech Solar',
      description: 'Affordable solar energy for homes',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
      goal: 50000,
      progress: 60
    },
    {
      id: 2,
      title: 'Local Farming Co',
      description: 'Community supported agriculture',
      image: 'https://images.unsplash.com/photo-1488459716781-6f3ee109c25e?w=500&h=400&fit=crop',
      goal: 35000,
      progress: 45
    },
    {
      id: 3,
      title: 'Tech Education',
      description: 'Free coding bootcamp for youth',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
      goal: 40000,
      progress: 75
    },
    {
      id: 4,
      title: 'Community Center',
      description: 'Revitalize local gathering space',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
      goal: 60000,
      progress: 55
    }
  ])

  return (
    <div className="relative w-full h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <div className={cn(
        "fixed md:relative inset-y-0 left-0 z-30 w-64 bg-slate-900/95 backdrop-blur border-r border-slate-800 transition-transform",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="bg-violet-600 text-white rounded-md p-2">
                <Gem className="h-4 w-4" />
              </div>
              <span className="font-bold text-white">CrowdLocal</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              { icon: <Zap className="w-4 h-4" />, label: 'Explore', active: true, onClick: () => {} },
              { icon: <Plus className="w-4 h-4" />, label: 'Create', active: false, onClick: () => setShowCreateProject(true) },
              { icon: <User className="w-4 h-4" />, label: 'Profile', active: false, onClick: () => {} }
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  item.active 
                    ? "bg-violet-600/30 text-violet-300" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-slate-950">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-slate-900/50 backdrop-blur border-b border-slate-800">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-slate-300 hover:text-violet-400 transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.name || user?.email || 'User'}!
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center">
              <User className="w-5 h-5 text-violet-400" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Featured Projects', icon: '⭐', color: 'from-purple-900/40 to-pink-900/40' },
              { title: 'Recent Activity', icon: '🔥', color: 'from-blue-900/40 to-cyan-900/40' },
              { title: 'My Projects', icon: '📁', color: 'from-green-900/40 to-emerald-900/40' }
            ].map((card) => (
              <div
                key={card.title}
                className={cn(
                  "bg-gradient-to-br p-6 rounded-2xl border border-slate-800 backdrop-blur hover:border-violet-600/50 transition-all",
                  card.color
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{card.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-slate-400">
                  {card.title === 'Featured Projects' && 'Discover trending fundraising campaigns'}
                  {card.title === 'Recent Activity' && 'Your latest interactions and updates'}
                  {card.title === 'My Projects' && 'Manage your crowdfunding campaigns'}
                </p>
              </div>
            ))}
          </div>

          {/* Featured Section */}
          <div className="mt-8">
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Featured This Week</h2>
              
              {/* 3D Interactive Section */}
              <div className="mb-8">
                <React.Suspense fallback={
                  <div className="w-full h-[500px] bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg border border-slate-800 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin">
                        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full"></div>
                      </div>
                      <span className="text-xs text-slate-400">Loading 3D experience...</span>
                    </div>
                  </div>
                }>
                  <SplineSceneBasic />
                </React.Suspense>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gradient-to-br from-violet-900/30 to-pink-900/30 rounded-xl overflow-hidden border border-slate-800 hover:border-violet-600/50 transition-all cursor-pointer group"
                  >
                    <div className="w-full h-32 bg-slate-800/50 rounded-t-lg mb-0 group-hover:opacity-90 transition-all overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1 truncate">{project.title}</h3>
                      <p className="text-xs text-slate-400 mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-violet-400">${(project.goal / 1000).toFixed(0)}K</span>
                        <span className="text-xs text-slate-500">{project.progress}%</span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full bg-slate-800/50 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-violet-500 to-pink-500 h-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateProject && (
        <CreateProject
          user={user}
          token={token}
          onSuccess={(newProject) => {
            // Add new project to the list
            setProjects(prev => [{
              id: newProject._id,
              title: newProject.title,
              description: newProject.tagline,
              image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
              goal: newProject.goal,
              progress: 0
            }, ...prev])
          }}
          onClose={() => setShowCreateProject(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
