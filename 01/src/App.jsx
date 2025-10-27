import React, { useState } from 'react';
import { Plus, Eye, Zap, Users, TrendingUp, User, X } from 'lucide-react';
import AnimatedCharactersLoginPage from './components/ui/animated-characters-login-page';
import AnimatedCharactersSignUpPage from './components/ui/animated-characters-signup-page';

export default function CrowdLocal() {
  // State Management
  const [currentPage, setCurrentPage] = useState('auth');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'AI-Powered Fashion Scanner',
      founder: 'Alex Chen',
      tagline: 'Real-time outfit compatibility checker using AI',
      goal: 50000,
      currentFunding: 32400,
      daysRemaining: 18,
      category: 'Tech',
      description:
        'We are building an AI-powered mobile app that analyzes your wardrobe and suggests compatible outfits in real-time. Perfect for Gen Z who want to maximize their style game without the decision fatigue.',
      image: '🤖',
    },
    {
      id: 2,
      title: 'Sustainable Sneaker Collab',
      founder: 'Jordan Martinez',
      tagline: 'Eco-friendly sneakers designed by the community',
      goal: 75000,
      currentFunding: 48500,
      daysRemaining: 12,
      category: 'Design',
      description:
        'We are designing limited-edition sustainable sneakers using recycled ocean plastics and community feedback. Each pair tells a story and supports environmental initiatives.',
      image: '👟',
    },
    {
      id: 3,
      title: 'Creator Fund DAO',
      founder: 'Sam Kim',
      tagline: 'Decentralized funding for content creators',
      goal: 100000,
      currentFunding: 67200,
      daysRemaining: 25,
      category: 'Tech',
      description:
        'A decentralized autonomous organization that funds emerging creators through community voting and blockchain transparency. No middlemen, pure creator power.',
      image: '🎬',
    },
    {
      id: 4,
      title: 'Mental Health Social Network',
      founder: 'Taylor Thompson',
      tagline: 'Safe space for Gen Z mental wellness',
      goal: 60000,
      currentFunding: 41300,
      daysRemaining: 20,
      category: 'Community',
      description:
        'Building a judgment-free social platform where Gen Z can discuss mental health, find peer support, and connect with verified wellness professionals in their community.',
      image: '🌱',
    },
  ]);
  const [formData, setFormData] = useState({
    title: '',
    founder: '',
    tagline: '',
    goal: '',
    category: 'Tech',
  });

  // Navigation Handlers
  const handleNavigateToExplore = () => setCurrentPage('explore');
  const handleNavigateToCreate = () => setCurrentPage('create');
  const handleNavigateToDetail = (project) => {
    setSelectedProject(project);
    setCurrentPage('detail');
  };
  const handleBackToExplore = () => setCurrentPage('explore');
  const handleSwitchToSignUp = () => setAuthMode('signup');
  const handleSwitchToLogin = () => setAuthMode('login');
  const handleSignUpSuccess = () => {
    setAuthMode('login'); // After successful signup, show login page with success message
    setCurrentPage('explore'); // Auto-login or go to explore
  };
  const handleLaunchProject = () => {
    const newProject = {
      id: projects.length + 1,
      ...formData,
      goal: parseInt(formData.goal),
      currentFunding: 0,
      daysRemaining: 30,
      description: `${formData.tagline} - Launching soon!`,
      image: '🚀',
    };
    setProjects([...projects, newProject]);
    setFormData({
      title: '',
      founder: '',
      tagline: '',
      goal: '',
      category: 'Tech',
    });
    setCurrentPage('explore');
  };

  // Calculate funding percentage
  const getFundingPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  // ==================== AUTH PAGE ====================
  if (currentPage === 'auth') {
    if (authMode === 'signup') {
      return (
        <AnimatedCharactersSignUpPage 
          onSignUpSuccess={handleSignUpSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      );
    }
    return (
      <AnimatedCharactersLoginPage 
        onLoginSuccess={handleNavigateToExplore}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    );
  }

  // ==================== EXPLORE PAGE ====================
  if (currentPage === 'explore') {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0D0D10] via-[#1a1a2e] to-[#0D0D10] overflow-x-hidden">
        {/* Animated gradient background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#7F00FF] rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
          <div className="absolute bottom-40 left-1/2 w-96 h-96 bg-[#00FF7F] rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
        </div>

        {/* Header - Glass-morphism Navigation */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🚀</span>
              <h1 className="text-2xl font-black bg-gradient-to-r from-[#7F00FF] to-[#00FF7F] bg-clip-text text-transparent">
                CrowdLocal
              </h1>
            </div>

            <button
              onClick={handleNavigateToCreate}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7F00FF] to-[#9933FF] hover:from-[#9933FF] hover:to-[#BB66FF] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#7F00FF]/50"
            >
              <Plus size={20} />
              New Project
            </button>

            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7F00FF] to-[#00FF7F] flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg hover:shadow-[#7F00FF]/50 transition-all">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              Explore Projects
            </h2>
            <p className="text-lg text-gray-400">
              Discover early-stage projects changing the game
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => {
              const fundingPercentage = getFundingPercentage(
                project.currentFunding,
                project.goal
              );
              return (
                <div
                  key={project.id}
                  className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7F00FF]/20 transform hover:scale-105"
                >
                  {/* Card Header with Image */}
                  <div className="h-40 bg-gradient-to-br from-[#7F00FF]/20 to-[#00FF7F]/20 flex items-center justify-center relative overflow-hidden">
                    <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                      {project.image}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Title & Founder */}
                    <h3 className="text-xl font-black text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      by {project.founder}
                    </p>

                    {/* Tagline */}
                    <p className="text-sm text-gray-300 mb-4">
                      {project.tagline}
                    </p>

                    {/* Category & Status Badge */}
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-gray-300">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 bg-[#00FF7F]/20 rounded-full text-xs font-bold text-[#00FF7F] flex items-center gap-1">
                        <Zap size={12} /> In Progress
                      </span>
                    </div>

                    {/* Funding Bar */}
                    <div className="mb-4">
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#7F00FF] to-[#00FF7F] transition-all duration-500"
                          style={{ width: `${fundingPercentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span className="font-bold text-white">
                          ${project.currentFunding.toLocaleString()}
                        </span>
                        <span>${project.goal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex gap-4 text-sm text-gray-400 mb-6">
                      <span className="flex items-center gap-1">
                        <TrendingUp size={14} /> {fundingPercentage.toFixed(0)}%
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} /> {project.daysRemaining} days left
                      </span>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleNavigateToDetail(project)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-[#7F00FF]/30 to-[#00FF7F]/30 hover:from-[#7F00FF] hover:to-[#00FF7F] text-white font-bold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/50 flex items-center justify-center gap-2"
                    >
                      <Eye size={16} /> View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // ==================== PROJECT DETAIL PAGE ====================
  if (currentPage === 'detail' && selectedProject) {
    const fundingPercentage = getFundingPercentage(
      selectedProject.currentFunding,
      selectedProject.goal
    );
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0D0D10] via-[#1a1a2e] to-[#0D0D10] overflow-x-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#7F00FF] rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
          <div className="absolute bottom-40 left-1/2 w-96 h-96 bg-[#00FF7F] rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
            <h1 className="text-2xl font-black bg-gradient-to-r from-[#7F00FF] to-[#00FF7F] bg-clip-text text-transparent">
              CrowdLocal
            </h1>
            <button
              onClick={handleBackToExplore}
              className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
            >
              ← Back
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="h-64 bg-gradient-to-br from-[#7F00FF]/30 to-[#00FF7F]/30 rounded-3xl flex items-center justify-center mb-12 relative overflow-hidden border border-white/10">
            <div className="text-9xl">{selectedProject.image}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                {selectedProject.title}
              </h1>
              <p className="text-xl text-gray-400 mb-6">
                by <span className="font-bold text-white">{selectedProject.founder}</span>
              </p>

              {/* Category & Status */}
              <div className="flex gap-3 mb-8">
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold text-gray-300">
                  {selectedProject.category}
                </span>
                <span className="px-4 py-2 bg-[#00FF7F]/20 rounded-full text-sm font-bold text-[#00FF7F] flex items-center gap-2">
                  <Zap size={14} /> In Progress
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {selectedProject.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <p className="text-gray-400 text-sm mb-2">Days Remaining</p>
                  <p className="text-3xl font-black text-white">
                    {selectedProject.daysRemaining}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                  <p className="text-gray-400 text-sm mb-2">Funding Goal</p>
                  <p className="text-3xl font-black text-white">
                    ${(selectedProject.goal / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - Funding Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sticky top-24">
                {/* Funding Progress */}
                <div className="mb-8">
                  <p className="text-gray-400 text-sm mb-2">Funding Progress</p>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-[#7F00FF] to-[#00FF7F]"
                      style={{ width: `${fundingPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-2xl font-black text-white mb-2">
                    {fundingPercentage.toFixed(0)}%
                  </p>
                  <p className="text-gray-400 text-sm">
                    ${selectedProject.currentFunding.toLocaleString()} of $
                    {selectedProject.goal.toLocaleString()}
                  </p>
                </div>

                {/* Fund Button */}
                <button className="w-full py-4 px-6 bg-gradient-to-r from-[#7F00FF] to-[#9933FF] hover:from-[#9933FF] hover:to-[#BB66FF] text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#7F00FF]/50 mb-4">
                  Fund Project
                </button>

                {/* Share Button */}
                <button className="w-full py-3 px-6 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white font-bold rounded-xl transition-all duration-300 border border-white/20">
                  Share
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==================== CREATE PROJECT PAGE ====================
  if (currentPage === 'create') {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0D0D10] via-[#1a1a2e] to-[#0D0D10] overflow-x-hidden flex items-center justify-center py-12">
        {/* Animated background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#7F00FF] rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
          <div className="absolute bottom-40 left-1/2 w-96 h-96 bg-[#00FF7F] rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
        </div>

        {/* Modal Overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={handleBackToExplore}
        ></div>

        {/* Modal Card - Glass-morphism */}
        <div className="relative z-50 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 max-w-2xl w-full mx-6 max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#7F00FF]/20">
          {/* Close Button */}
          <button
            onClick={handleBackToExplore}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Title */}
          <h1 className="text-4xl font-black text-white mb-2">Launch Your Project</h1>
          <p className="text-gray-400 mb-8">
            Tell the world about your WIP and start building your community.
          </p>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                formData.title &&
                formData.founder &&
                formData.tagline &&
                formData.goal
              ) {
                handleLaunchProject();
              }
            }}
            className="space-y-6"
          >
            {/* Project Title */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., AI-Powered Fashion Scanner"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7F00FF] transition-all"
              />
            </div>

            {/* Founder Name */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                Your Name
              </label>
              <input
                type="text"
                value={formData.founder}
                onChange={(e) =>
                  setFormData({ ...formData, founder: e.target.value })
                }
                placeholder="e.g., Alex Chen"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7F00FF] transition-all"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
                placeholder="One-liner describing your project"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7F00FF] transition-all"
              />
            </div>

            {/* Funding Goal */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                Funding Goal (USD)
              </label>
              <input
                type="number"
                value={formData.goal}
                onChange={(e) =>
                  setFormData({ ...formData, goal: e.target.value })
                }
                placeholder="e.g., 50000"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7F00FF] transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#7F00FF] transition-all"
              >
                <option value="Tech" className="bg-[#1a1a2e]">
                  Tech
                </option>
                <option value="Design" className="bg-[#1a1a2e]">
                  Design
                </option>
                <option value="Community" className="bg-[#1a1a2e]">
                  Community
                </option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleBackToExplore}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all duration-300 border border-white/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] hover:from-[#00FF7F] hover:to-[#00FF7F] text-black font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#00FF7F]/50"
              >
                Launch Project
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
