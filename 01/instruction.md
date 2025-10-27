# CrowdLocal Web App Development Instructions

## 1. Project Overview

**Project Name:** CrowdLocal 🚀
**Goal:** A modern crowdfunding platform tailored for **Gen Z founders** funding "work in progress" projects.
**Theme Mandate:** **Sleek Dark Glass-morphism**. The design must feel modern, fluid, and premium, utilizing the vibrant colors as high-contrast accents against a dark background, and must be optimized for mobile-first use.

---

## 2. Technical Requirements

The entire application **MUST** be built as a **single, self-contained React functional component file (`App.jsx`)** using modern functional components and hooks.

* **Framework:** React (Functional Components/Hooks).
* **Styling:** **Tailwind CSS** (mandatory for rapid, responsive, and vibrant styling).
* **Structure:** All HTML structure, CSS styling (via Tailwind classes), and JavaScript logic must reside in the single file.
* **State Management:** Use `useState` and `useReducer` for application state.
* **Navigation:** Use simple conditional rendering (or a `switch` statement) for navigation between major views (Auth, Explore, Project Detail, Create Project).

---

## 3. Design and Aesthetics (Dark Glass-morphism Vibe)

The application must implement a "Sleek Dark Glass" theme.

| Element | Specification |
| :--- | :--- |
| **Color Palette** | **Primary Accent:** Electric Violet (`#7F00FF`). **Secondary Accent:** Cyber Green (`#00FF7F`). **Background:** Deep dark color, perhaps black or near-black (`#0D0D10`), with a large, blurry, colorful gradient overlay to enable the glass effect. **Text:** White/Light Gray. |
| **Typography** | Modern Sans-Serif. Use large, bold headings. Text must be light-colored. |
| **UI Elements** | **Glass-morphism Effect:** Use semi-transparent dark backgrounds with heavy blur (e.g., via a pseudo-class or custom class replicating `backdrop-filter: blur(10px)`) for all cards, forms, and the header. **Highly Rounded Corners** (`rounded-xl` or `rounded-2xl`). All interactive elements must use the **Primary Accent** color (`#7F00FF`) for prominence and have smooth `hover` effects (e.g., slight scale or color shift). |
| **Layout** | Fully responsive, **mobile-first** design. Ensure extensive use of `flex` and `grid` for elegant scaling. |

---

## 4. Core Application Components & Views

The application state will track `currentPage: 'auth' | 'explore' | 'detail' | 'create'`.

### A. Authentication Page (`currentPage: 'auth'`)

* **Design:** Centered form using the **Glass-morphism effect** on the dark, blurred background. Large, light-colored title ("Welcome to CrowdLocal").
* **Functionality:** Two buttons/forms for **Sign Up** and **Log In**.
* **Requirement:** Include a prominent button styled with the **Primary Accent** color, such as **"Start Building"**, to transition to the 'explore' page once authentication is conceptually complete (state change only).

### B. Explore Page (`currentPage: 'explore'`)

* **Header:** Fixed navigation bar with the CrowdLocal logo/name and a **+ New Project** button, styled with the **Glass-morphism effect**.
* **Project Listing:** Display projects in a responsive grid (2-3 columns on desktop, 1 column on mobile).
* **Project Card Structure (Must use Glass-morphism):**
    * Project Title (bold, light text).
    * **"In Progress" Tag:** A vibrant, pill-shaped tag using the **Secondary Accent** color (`#00FF7F`).
    * **Funding Bar:** A simple, high-contrast progress bar using the **Primary Accent** color.
    * A prominent **"View Details"** button to transition to the Project Detail view.

### C. Project Detail View (`currentPage: 'detail'`)

* **Layout:** Dedicated page for a single selected project.
* **Content:**
    * Project Image Placeholder (large, rounded).
    * **Funding Metrics:** Display required amount, current amount, and remaining days.
    * A large, vibrant **Fund Project** button using the **Primary Accent** color.
    * Project Description, Founder Section (small card/avatar with mock social link).

### D. Create Project Form (`currentPage: 'create'`)

* **Interaction:** A multi-step or simple form presented in a modal overlay, using the **Glass-morphism effect** for a premium feel.
* **Key Fields:** Project Title, Funding Goal (Number input), Category/Tags, Detailed Description (Textarea).
* **Action:** A final **Launch Project** button using the **Secondary Accent** color that conceptually adds the new project to the list and returns to the Explore page.

---

## 5. Mock Data Structure

The app must load and display at least four mock projects using this structure.

```typescript
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
Initial State: The app must start at the 'auth' page.

User Interface: Ensure fluid transitions and smooth CSS effects on all interactive elements.

Development Note: Since actual backdrop-filter utility isn't standard in Tailwind, you must use a clever combination of semi-transparent backgrounds and shadows to mimic the Glass-morphism look, or include the necessary custom CSS utility definitions if possible within the single file structure.