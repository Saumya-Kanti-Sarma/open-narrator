<!-- BEGIN:nextjs-agent-rules -->
1. Definitions  
  Elements  
    Smallest UI building blocks 
    Stateless and reusable  
    Examples: Button,  Input,  Badge,  Icon 
    Must NOT contain business logic 
    Stored in: `/components/elements` 
  
  Components
    Composed using multiple elements
    Can contain logic, state, and behavior
    Examples: Navbar,  Hero Section,  Pricing Card,  Feature Section
    Stored in: `/components`

2. Code Architecture Discipline

  ALWAYS maintain clean folder structure
  Follow separation of concerns:

    UI → components
    Logic → hooks / utils
    Data → services / APIs

3. Architecture Documentation (MANDATORY)

  After ANY of the following:
    New feature implementation
    Folder structure change
    New component system
    State management change

  You MUST update: `./web-app/code-architecture.md`

  Must include:
    Feature description
    Files added/modified
    Data flow
    Component hierarchy

4. Code Documentation Rule (STRICT)
  Every file MUST start with:
    ```ts
    /**
    Purpose: What this file does
    Used in: Where this is used
    Dependencies: What it depends on
    */
    ```

5. Component-Level Documentation:
  Every component/function MUST include:

    ```ts
    /**
    Component: Name
    Description: What it renders / does
    Props:
    - propName: type → description
    */
    ```

6. Reusability First
  Before creating anything new:
    Check if similar element/component exists
    Prefer extension over duplication

7. Styling Rules
  Use Tailwind CSS (default)
  Follow design system colors:
    Background Dark: #282828
    Background Light: #FFF7EE
    primary font: "Katibeh"
  Use Image from Next.js everytime. Avoid native `<img>` tag
  use jersey-10 for headings and use doto for others and use sans for important texts.




8. Naming Conventions
  Components: `PascalCase`
  Functions: `camelCase`
  Files:

    Components → `ComponentName.tsx`
    Hooks → `useSomething.ts`
    Utils → `something.util.ts`

9. API & Data Layer
  Keep API logic separate (`/services`)
  Never call APIs directly inside UI components
  Use hooks for data fetching

10. Add aria labels where needed and Ensure keyboard navigation

11. Strictly avoid using emojies and use `react icons` where ever necessary.

<!-- END:nextjs-agent-rules -->
