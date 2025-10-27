import express from 'express';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ status: 'active' })
      .populate('founder', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: error.message || 'Failed to get projects' });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('founder', 'name email')
      .populate('contributors', 'name email');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: error.message || 'Failed to get project' });
  }
});

// Create project
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, tagline, description, goal, daysRemaining, category } = req.body;

    if (!title || !tagline || !description || !goal || !daysRemaining || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const project = new Project({
      title,
      founder: req.userId,
      founderName: user.name,
      tagline,
      description,
      goal,
      daysRemaining,
      category,
      image: '🚀',
    });

    await project.save();

    // Add project to user's createdProjects
    user.createdProjects.push(project._id);
    await user.save();

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: error.message || 'Failed to create project' });
  }
});

// Fund project
router.post('/:id/fund', authenticate, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Please provide a valid amount' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project funding
    project.currentFunding += amount;

    // Add user to contributors if not already there
    if (!project.contributors.includes(req.userId)) {
      project.contributors.push(req.userId);
    }

    await project.save();

    // Add project to user's fundedProjects
    const user = await User.findById(req.userId);
    if (!user.fundedProjects.includes(project._id)) {
      user.fundedProjects.push(project._id);
      await user.save();
    }

    res.status(200).json({
      message: 'Funding successful',
      project,
    });
  } catch (error) {
    console.error('Fund project error:', error);
    res.status(500).json({ message: error.message || 'Failed to fund project' });
  }
});

// Update project
router.put('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.founder.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not authorized to update this project' });
    }

    const { title, tagline, description, goal, daysRemaining, category, status } = req.body;

    if (title) project.title = title;
    if (tagline) project.tagline = tagline;
    if (description) project.description = description;
    if (goal) project.goal = goal;
    if (daysRemaining) project.daysRemaining = daysRemaining;
    if (category) project.category = category;
    if (status) project.status = status;

    await project.save();

    res.status(200).json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: error.message || 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.founder.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(req.params.id);

    // Remove project from user's createdProjects
    await User.findByIdAndUpdate(req.userId, {
      $pull: { createdProjects: req.params.id },
    });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: error.message || 'Failed to delete project' });
  }
});

export default router;
