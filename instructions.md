CrowdLocal Web App Development Instructions

1. Project Overview

Project Name: CrowdLocal
Goal: A modern crowdfunding platform tailored for Gen Z founders funding "work in progress" projects.
Theme Mandate: Vibrant, professional, and authentic (avoiding corporate dullness). The design must feel modern, fluid, and optimized for mobile-first use.

2. Technical Requirements

The entire application MUST be built as a single, self-contained React component file (App.jsx) using modern functional components and hooks.

Framework: React (Functional Components/Hooks).

Styling: Tailwind CSS (mandatory for rapid, responsive, and vibrant styling).

Structure: All HTML structure, CSS styling (via Tailwind classes), and JavaScript logic must reside in the single file.

State Management: Use useState and useReducer for application state.

Navigation: Use simple conditional rendering or a switch statement for navigation between major views (Auth, Explore, Project Detail, Create Project).

3. Design and Aesthetics (Gen Z Vibe)

The application must implement a "Vibrant Tech" theme.

Element

Specification

Color Palette

Primary: Bright, engaging hue (e.g., Electric Violet: #7F00FF). Secondary: Energetic contrast (e.g., Cyber Green: #00FF7F). Background: Off-white or light gray (#F9FAFB). Accent: Subtle gradients and shadows.

Typography

Modern Sans-Serif (assume "Inter" or similar clear font). Use larger, bold headings.

UI Elements

Highly Rounded Corners (rounded-xl or rounded-2xl everywhere). Use soft shadow effects (shadow-lg). All interactive elements should have a clear hover or active state (e.g., scale up slightly, change shadow color).

Layout

Fully responsive, mobile-first design. Use flex and grid extensively to ensure content scales gracefully. The design must minimize Cumulative Layout Shift (CLS).

4. Core Application Components & Views

The application state will track currentPage: 'auth' | 'explore' | 'detail' | 'create'.

A. Authentication Page (currentPage: 'auth')

Design: Simple, centered card with large, playful title ("Welcome to CrowdLocal").

Functionality: Two buttons/forms for Sign Up and Log In.

Requirement: Include a prominent button styled with the Primary color, such as "Start Building", to switch to the 'explore' page once authentication is conceptually complete (no actual backend is required, just state change).

B. Explore Page (currentPage: 'explore')

Header: Fixed navigation bar with the CrowdLocal logo/name, a user profile icon (placeholder), and a + New Project button.

Project Listing: Display projects in a responsive grid (2-3 columns on desktop, 1 column on mobile).

Project Card Structure (Use a Mock Project Data Array):

Project Title (bold).

Founder/Team Name (smaller text).

"In Progress" Tag: A vibrant, pill-shaped tag to reinforce the theme.

Funding Bar: A simple, high-contrast progress bar showing funded amount vs. goal (e.g., 65% funded).

A prominent "View Details" button to transition to the Project Detail view.

C. Project Detail View (currentPage: 'detail')

Layout: Dedicated page for a single selected project.

Content:

Project Image Placeholder (large, rounded).

Funding Metrics: Display required amount, current amount, and remaining days.

A large, vibrant Fund Project button.

Project Description: A rich, multi-paragraph section detailing the "Why" and "What" of the project.

Founder Section: Small card/avatar for the founder with a mock social link.

D. Create Project Form (currentPage: 'create')

Interaction: A multi-step or tabbed form presented in a modal overlay for a better user experience.

Key Fields:

Project Title & Tagline.

Funding Goal (Number input).

Category/Tags (e.g., Tech, Art, Social Impact).

Detailed Description (Textarea).

Action: A final Launch Project button that conceptually adds the new project to the list and returns to the Explore page.

5. Mock Data Structure

Please use the following TypeScript-like structure for the mock project data. The app should load and display at least four mock projects.

interface Project {
  id: number;
  title: string;
  founder: string;
  tagline: string;
  goal: number; // USD
  currentFunding: number; // USD
  daysRemaining: number;
  category: 'Tech' | 'Design' | 'Community';
  description: string;
}


6. Implementation Notes

Initial State: The app should start at the 'auth' page.

Error Handling: Use inline console logging for mock authentication/submission success (no alert() or confirm() is allowed).

User Interface: Ensure a fluid transition between pages/states and use smooth CSS transitions for buttons and elements to enhance the Gen Z "interactive" feel.