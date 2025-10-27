# 🎨 CrowdLocal UI/UX Guide

## Color System

### Primary Colors
```
Electric Violet (#7F00FF) - Main action buttons, branding, headings
Primary Dark (#6600CC) - Hover states for primary buttons
Primary Light (#9933FF) - Alternative accent
```

### Secondary Colors
```
Cyber Green (#00FF7F) - Accent elements, tags, "In Progress" badges
Secondary Dark (#00CC66) - Hover states for secondary buttons
Secondary Light (#33FF99) - Lighter variant
```

### Neutral Colors
```
Background (#F9FAFB) - Main page background
White (#FFFFFF) - Card backgrounds
Gray scales - Text hierarchy and dividers
```

## Component Patterns

### Button Styles

#### Primary Button (btn-primary)
- Background: Electric Violet (#7F00FF)
- Text: White
- Hover: Darker violet with scale-105
- Usage: Main CTAs, "Start Building", "Launch Project"

#### Secondary Button (btn-secondary)
- Background: Cyber Green (#00FF7F)
- Text: Gray-900
- Hover: Darker green with scale-105
- Usage: Secondary actions

#### Outline Button (btn-outline)
- Border: 2px Electric Violet
- Text: Electric Violet
- Hover: Filled violet background
- Usage: Alternative actions, "Back" buttons

### Cards (card)
- Background: White
- Border-radius: rounded-2xl
- Shadow: shadow-lg
- Hover: shadow-xl with slight lift
- Padding: p-6 (24px)

### Tags
- Background: Cyber Green
- Text: Gray-900
- Border-radius: rounded-full
- Padding: px-3 py-1

## Spacing Scale

- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)
- 2xl: 48px (3rem)

## Typography

### Headings
- H1: 36px (2.25rem) or 48px (3rem), font-900 (black)
- H2: 30px (1.875rem), font-900
- H3: 24px (1.5rem), font-bold (700)
- H4: 20px (1.25rem), font-bold

### Body Text
- Large: 18px (1.125rem)
- Base: 16px (1rem)
- Small: 14px (0.875rem)
- Tiny: 12px (0.75rem)

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Black: 900

## Page Layouts

### Authentication Page
```
Gradient Background (Primary to Secondary)
├── Centered Container (max-w-md)
    ├── Logo/Title Area
    ├── Auth Card (Login/Signup tabs)
    └── CTA Button
```

### Explore Page
```
Fixed Header
├── Navigation Bar (sticky)
    ├── Logo
    ├── Search Input
    ├── Category Filters
    └── User Profile + New Project
└── Project Grid
    ├── Responsive Grid (1-3 columns)
    └── Project Cards
```

### Detail Page
```
Fixed Header
├── Back Button
└── Content Grid
    ├── Left Column (2/3 width on desktop)
    │   ├── Large Image
    │   ├── Title & Tags
    │   ├── Founder Card
    │   └── Description
    └── Right Column (1/3 width)
        ├── Funding Status Card
        ├── Funding Form
        └── Stats Card
```

### Create Page
```
Gradient Background
├── Back Button
└── Modal Card
    ├── Title
    ├── Step Indicator (progress bars)
    ├── Form Fields (step 1/2/3)
    ├── Action Buttons
    └── Form Preview
```

## Interactive Elements

### Hover Effects
- Buttons: scale-105 + shadow increase
- Cards: shadow increase + subtle lift (-translate-y-1)
- Links: color change + underline

### Transitions
- Duration: 300ms (0.3s)
- Easing: Default (ease-in-out)
- Properties: All properties

### Animations
```css
fade-in: Opacity transitions
hover:scale-105: Button scale on hover
hover:shadow-xl: Card shadow increase
transition-all: All property changes
```

## Responsive Breakpoints

- Mobile: < 640px (1 column grid)
- Tablet: 640px - 1024px (2 column grid)
- Desktop: > 1024px (3 column grid)

## Accessibility

### Color Contrast
- Primary on White: ✅ WCAG AA
- Secondary on White: ✅ WCAG AA
- Text on backgrounds: ✅ Sufficient contrast

### Interactive Elements
- Minimum touch target: 44x44px
- Clear focus states
- Semantic HTML
- ARIA labels where needed

### Typography
- Readable font size (minimum 14px)
- Sufficient line height (1.5)
- Bold headings for hierarchy

## Mobile-First Approach

1. Design for mobile first (smallest screen)
2. Progressive enhancement for larger screens
3. Flexible layouts (flex, grid)
4. Responsive typography (text-base to text-lg)
5. Touch-friendly spacing

## Performance Considerations

- Smooth 60fps animations
- No unnecessary re-renders
- Optimized images (emojis for now)
- Minimal CSS (Tailwind purging)
- Fast font loading (Google Fonts)

## Dark Mode (Optional Future)

When implementing dark mode:
- Primary: Keep #7F00FF
- Secondary: Keep #00FF7F
- Background: Use dark gray (#111827)
- Cards: Use dark gray (#1F2937)
- Text: Use white/light gray

## Component States

### Button States
- Default: Full color
- Hover: Darker shade + scale
- Active: Even darker shade
- Disabled: Grayed out + no-cursor
- Loading: Spinner animation

### Form States
- Empty: Light border
- Filled: Border highlight
- Focus: Primary border color
- Error: Red border + error text
- Success: Green border + checkmark

### Card States
- Default: White card with shadow
- Hover: Lift + increased shadow
- Active/Selected: Border highlight
- Disabled: Grayed out appearance

---

**Design System Version:** 1.0  
**Last Updated:** 2025-10-27  
**Status:** Complete ✅
