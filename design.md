# Design System Strategy: High-End Editorial Portfolio
 
## 1. Overview & Creative North Star
The **Creative North Star** for this design system is **"The Nocturnal Architect."** 
 
Unlike standard engineer portfolios that rely on rigid grids and generic templates, this system treats digital space as a sophisticated, architectural environment. It is designed to feel like a premium midnight workspace—deep, immersive, and intentionally quiet. The aesthetic moves away from "web design" and toward "digital editorial," utilizing high-contrast typography scales, intentional asymmetry, and a focus on atmospheric depth over structural lines.
 
By leveraging tonal layering and soft glows, we create a signature experience that suggests the engineer behind it is not just a coder, but a builder of complex, polished systems.
 
## 2. Colors & Atmospheric Depth
The color palette is rooted in deep obsidian and midnight blues, punctuated by high-frequency accents of electric sky blue and soft violet.
 
### Tonal Hierarchy
- **Primary Background (`surface` / `#0b1326`):** The foundational void. Everything emerges from here.
- **Accents:** `primary_container` (#38bdf8) and `secondary` (#ddb8ff) are used sparingly to guide the eye toward interactive elements.
 
### The "No-Line" Rule
To achieve a high-end feel, **prohibit the use of 1px solid borders for sectioning.** Structural separation must be achieved through:
1.  **Background Shifts:** Transitioning from `surface` to `surface_container_low` to define a new content area.
2.  **Negative Space:** Using the spacing scale to create clear mental boundaries without physical ones.
 
### Surface Hierarchy & Nesting
Treat the UI as physical layers of "Obsidian Glass." Use the surface tiers to create depth:
*   **Base:** `surface`
*   **Section Wrapper:** `surface_container_low`
*   **Interactive Cards:** `surface_container` or `surface_container_high`
*   **Floating Modals:** `surface_bright` with a backdrop-blur.
 
### The "Glass & Gradient" Rule
Standard flat colors feel "out-of-the-box." This system requires:
*   **Glassmorphism:** Navigation bars and floating cards must use `surface_container` at 70% opacity with a `20px` backdrop-blur.
*   **Signature Textures:** Main CTAs should utilize a subtle linear gradient from `primary` (#8ed5ff) to `primary_container` (#38bdf8) at a 135-degree angle to provide a sense of illumination and energy.
 
## 3. Typography
The typography is a dialogue between the human-centric **Inter** and the technical precision of **ui-monospace**.
 
*   **Display Scales (`display-lg` to `display-sm`):** Use these for hero statements. Set with tight letter-spacing (-0.02em) to create a bold, authoritative "editorial" look.
*   **The Technical Label:** `label-md` and `label-sm` use **ui-monospace**. These are the "metadata" of the portfolio (e.g., dates, tech stack, small captions). This font shift signals a transition from narrative to technical data.
*   **Visual Hierarchy:** Use `headline-lg` for project titles to create a clear "entry point" on the page, ensuring it is significantly larger than the surrounding `body-lg` text to emphasize importance.
 
## 4. Elevation & Depth
In this design system, depth is a matter of light and atmosphere, not drop shadows.
 
*   **The Layering Principle:** Avoid traditional shadows. Instead, place a `surface_container_lowest` card on a `surface_container_low` background. The subtle change in hex value creates a "natural lift" that feels integrated into the environment.
*   **Ambient Glows:** When a "floating" effect is required (like a featured project), use a shadow with a blur of `40px` and an opacity of `8%`. The shadow color must be tinted with the `primary` blue token to mimic light reflecting off a dark surface.
*   **The "Ghost Border" Fallback:** If a divider is strictly necessary for accessibility, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.
*   **Soft Glows:** Use radial gradients of `primary` (at 5-10% opacity) in the background behind major sections to simulate "ambient light" coming from the content itself.
 
## 5. Components
 
### Buttons
*   **Primary:** Solid gradient (`primary` to `primary_container`). Border-radius `full`. Sharp, `label-md` typography.
*   **Secondary:** Ghost style. No background. A "Ghost Border" using `primary` at 20% opacity. On hover, transition to 10% background opacity.
*   **Tertiary:** Text only in `primary` with a `ui-monospace` label.
 
### Project Cards
*   **Style:** No borders. Use `surface_container_low`. 
*   **Interaction:** On hover, the background shifts to `surface_container_high` and the `primary` accent glow intensifies.
*   **Dividers:** Strictly forbidden. Use `1.5rem` (xl) of vertical padding to separate header from description.
 
### Chips (Tech Stack)
*   **Style:** `surface_container_highest` background.
*   **Shape:** `sm` (0.25rem) roundedness for a sharper, more technical "component" look compared to the rounded buttons.
*   **Text:** `label-sm` (ui-monospace).
 
### Input Fields
*   **Style:** Bottom-border only or "Ghost Border." Background should be `surface_container_lowest`.
*   **Focus:** The bottom border transforms into a `primary` blue glow.
 
### Custom Component: The "Experience Timeline"
*   **Style:** A vertical line using `outline_variant` at 20% opacity. 
*   **Node:** Each experience entry is marked by a `primary` blue dot with a CSS `box-shadow` glow.
 
## 6. Do's and Don'ts
 
### Do
*   **Do** use asymmetrical layouts (e.g., a left-aligned headline with a right-aligned project card) to break the "grid" feel.
*   **Do** use `ui-monospace` for all numbers and dates to emphasize the "Software Engineer" persona.
*   **Do** embrace negative space. If a section feels crowded, double the padding.
 
### Don'ts
*   **Don't** use pure black (#000000). Always use the `surface` tokens to maintain the deep blue "Nocturnal" atmosphere.
*   **Don't** use standard "drop shadows" (black, high-opacity). They look "dirty" on dark backgrounds. Use tinted ambient glows.
*   **Don't** use more than one accent color per section. If a project is "Blue," don't introduce "Violet" nearby unless it is a deliberate secondary highlight.

## 7. Dynamic Interactions & Micro-Animations
The interface must feel responsive and alive, encouraging user interaction.
*   **Micro-Animations:** Use subtle micro-animations for interactive elements (e.g., slight scaling when active, smooth background transitions).
*   **Hover States:** Ensure all actionable items respond gracefully on hover with fluid transitions (not instant snaps).
*   **Loading & Entry:** Elements should glide or fade in, contributing to the premium, architectural aesthetic.

## 8. SEO & Semantic HTML Best Practices
Maintain high engineering quality alongside the visual aesthetic:
*   **Semantic Structure:** Use appropriate HTML5 semantic elements (`<article>`, `<section>`, `<nav>`, `<main>`).
*   **Headings:** Strictly one `<h1>` per page, following proper hierarchical order down to `<h4>`.
*   **Accessibility & Testing:** Ensure interactive elements have unique, descriptive IDs for browser testing and robust aria-labels where needed.
*   **SEO Fundamentals:** Include proper, descriptive title tags and compelling meta descriptions for each page.