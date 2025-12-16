# AI Playground - Interactive AI Chat Interface

A modern, feature-rich AI playground built with Next.js, TypeScript, and Tailwind CSS for experimenting with AI models, managing prompts, and testing various parameters.

## 🔗 Links

- **Live Demo:** [Your Deployed URL Here]
- **Figma Design:** [https://www.figma.com/design/CF2qTXyHTz0Jn8GtpoumRR/AI-Chart](https://www.figma.com/design/CF2qTXyHTz0Jn8GtpoumRR/AI-Chart?node-id=0-1&t=G5jQppHp75AxoCHy-1)
- **GitHub Repository:** https://github.com/JashanSaini11/AI-Chat--ai-playground-

---

## 1. Research

### Platforms Reviewed & Standout Features

#### OpenAI Playground
Provides precise control over GPT models with real-time parameter adjustment and multiple interaction modes (Chat, Assistants, Complete), plus an innovative "Generate" button that auto-creates prompts and function definitions.

#### Hugging Face Spaces
Enables one-click ML demo deployment with Git integration, instant duplication for derivative demos, and collaborative editing with live-reloading capabilities for rapid prototyping.

#### Anthropic Claude
Features an innovative Artifacts system that renders code in a separate window with real-time preview for SVGs, websites, and React components, combined with an exceptionally large 200K+ token context window.

#### Microsoft Copilot Lab
Offers experimental AI features including "Think Deeper" for enhanced reasoning and "Copilot Vision" for real-time webpage analysis, allowing users to test bleeding-edge capabilities before general release.

### Chosen Features (6)

1. **Model Selector with Variants** - Dynamic dropdown to switch between AI models (GPT-3.5, GPT-4, Claude, Custom) with visual indicators showing model capabilities, context window size, and max tokens.

2. **Prompt Editor with Template System** - Rich text editor with save/load functionality for reusable prompt templates stored as JSON, including preset templates for common tasks like code review, concept explanation, and brainstorming.

3. **Advanced Parameters Panel** - Collapsible control panel with sliders for fine-tuning temperature (0-2), max tokens (256-4096), top-P (0-1), and frequency penalty (0-2), plus optional system message configuration.

4. **Interactive Chat Display** - Real-time chat interface showing conversation history with formatted messages, user/AI distinction through color-coded bubbles, timestamps, and individual message copy functionality.

5. **Template Management System** - Complete CRUD operations for prompt templates including save with custom names, load into editor, delete with confirmation, and visual preview of template content.

6. **Theme Toggle with Smooth Transitions** - Light/dark mode switch that applies CSS variable-based theming across all components with smooth transitions, enhancing user comfort in different lighting conditions.

---

## 2. Design

### Design Mockup

**Figma Link:** [https://www.figma.com/design/CF2qTXyHTz0Jn8GtpoumRR/AI-Chart](https://www.figma.com/design/CF2qTXyHTz0Jn8GtpoumRR/AI-Chart?node-id=0-1&t=G5jQppHp75AxoCHy-1)

The design features a three-column responsive layout:
- **Left Sidebar (280px):** Model selector, parameters, templates, theme toggle
- **Main Area (flex-1):** Chat messages with auto-scroll
- **Bottom Section:** Prompt editor with action buttons

### Tailwind Mapping

#### Color System

**Light Theme:**
```css
Background: #ffffff (#FFFFFF)
Foreground: #252629 (oklch(0.145 0 0))
Muted: #ececf0 (#ECECF0)
Border: rgba(0, 0, 0, 0.1)
Sidebar: #fbfbfb (oklch(0.985 0 0))
Primary Accent: #2563EB (Blue 600)
```

**Dark Theme:**
```css
Background: #252629 (oklch(0.145 0 0))
Foreground: #fbfbfb (oklch(0.985 0 0))
Muted: #454649 (oklch(0.269 0 0))
Border: #454649 (oklch(0.269 0 0))
Sidebar: #343538 (oklch(0.205 0 0))
Primary Accent: #3B82F6 (Blue 500)
```

#### Typography System

```
H1: text-2xl (24px), font-medium (500)
H2: text-xl (20px), font-medium (500)
H3: text-lg (18px), font-medium (500)
Body: text-base (16px), font-normal (400)
Small: text-sm (14px)
Tiny: text-xs (12px)
Font Family: Inter, system-ui, sans-serif
```

#### Spacing & Layout

```
Sidebar Width: w-[280px] (280px fixed)
Container Padding: p-4 (16px), p-6 (24px)
Element Gaps: gap-2 (8px), gap-4 (16px), gap-6 (24px)
Border Radius: rounded-lg (10px), rounded-xl (12px)
Button Padding: px-4 py-2 (16px × 8px)
Input Padding: px-3 py-2 (12px × 8px)
```

### Component Translation

#### Model Selector
- **Mockup:** Dropdown with model info
- **Code:** `<select>` styled with `bg-input-background border border-border rounded-lg`
- **Features:** Hover state (`hover:bg-accent`), focus ring (`focus:ring-2 focus:ring-ring`)

#### Parameter Sliders
- **Mockup:** Horizontal sliders with labels and values
- **Code:** Custom `<input type="range">` with styled track and thumb
- **Implementation:** 
  - Track: `h-2 bg-muted rounded-lg` (8px height, gray background)
  - Thumb: `w-4 h-4 bg-blue-600 rounded-full` (16px circle, blue)
  - Fill: Separate div with `width: ${percentage}%` for progress visualization

#### Chat Messages
- **Mockup:** Alternating left/right aligned bubbles
- **Code:** 
  - User: `ml-auto bg-blue-600 text-white rounded-br-none` (right, blue, 70% max-width)
  - AI: `mr-auto bg-muted text-foreground rounded-bl-none` (left, gray, 70% max-width)
- **Avatars:** 32×32px gradient circles with initials

#### Theme Toggle
- **Mockup:** Sun/Moon icon button in sidebar footer
- **Code:** Button with icon swap based on theme state
- **Implementation:** `onClick` toggles theme class on `<html>` element, CSS variables update instantly

---

## 3. Development

### Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS with custom CSS variables
- **Icons:** Lucide React
- **State:** React Context API + Custom Hooks
- **Documentation:** Storybook

### Implementation Notes

#### a. Model Selector
**File:** `components/features/ModelSelector.tsx`

Dropdown component for selecting AI models. Fetches model list from `/api/models` endpoint and displays name, description, max tokens, and context window for each option.

**Key Implementation:**
- Uses `useState` for dropdown open/close state
- Fetches models on component mount with `useEffect`
- Click outside handler closes dropdown (fixed backdrop div)
- Loading skeleton during data fetch
- Accessible with `aria-expanded`, `aria-haspopup`, `role="listbox"`

#### b. Prompt Editor  
**File:** `components/features/PromptEditor.tsx`

Multi-line textarea with save/load template functionality and action buttons.

**Key Implementation:**
- Character counter displays current length at bottom-right
- Keyboard shortcut: Enter sends, Shift+Enter adds new line
- Three action buttons: Send (primary blue), Save Template (secondary gray), Clear (ghost)
- Save opens modal (`useState` for modal visibility) to name template
- Disabled state when loading or empty input

#### c. Parameters Panel
**File:** `components/features/ParametersPanel.tsx`

Collapsible panel with sliders for model configuration parameters.

**Key Implementation:**
- **Temperature (0-2, step 0.1):** Controls randomness. Shows hints like "More focused" (<0.5), "Balanced" (0.5-1), "More creative" (>1)
- **Max Tokens (256-4096, step 256):** Response length limit
- **Top P (0-1, step 0.01):** Nucleus sampling for diversity control
- **Frequency Penalty (0-2, step 0.1):** Reduces token repetition
- **System Message (textarea):** Optional behavior guidance
- Collapsible with chevron icon rotation animation

#### d. Chat/Output Area
**File:** `components/features/ChatArea.tsx`

Displays conversation history with message bubbles, copy functionality, and export options.

**Key Implementation:**
- Auto-scroll to bottom on new messages using `useRef` and `scrollIntoView`
- Copy button on AI messages uses `navigator.clipboard.writeText()`
- Download JSON button exports messages array as `.json` file
- Loading indicator: Three animated dots with staggered delays (0ms, 150ms, 300ms)
- Empty state: Centered icon with helpful text
- Message timestamp formatted as "2:30 PM" using `toLocaleTimeString()`

#### e. Template Management
**File:** `components/features/TemplatesList.tsx`

Displays saved templates with click-to-load and delete functionality.

**Key Implementation:**
- Lists templates from `useTemplates` hook
- Click template item → calls `onTemplateSelect` → loads prompt into editor
- Delete button (trash icon) appears on hover → shows confirmation dialog → calls API DELETE
- Empty state with icon when no templates exist
- Truncates long prompts to 60 characters with ellipsis

#### f. Theme Toggle
**File:** `components/providers/ThemeProvider.tsx`

Context provider managing light/dark theme with CSS variable switching.

**Key Implementation:**
- `useState` for current theme (not localStorage due to Claude artifacts compatibility)
- `useEffect` applies theme: removes old class, adds new class to `document.documentElement`
- Toggle button swaps Sun/Moon icon based on current theme
- All CSS variables (colors, borders, backgrounds) update instantly via CSS cascade
- Smooth transitions defined in `globals.css` with `transition-colors` classes

### Data & State Management

#### Mock API
**File:** `lib/api/mock-api.ts`

Simulates backend API with realistic delays (300-1500ms) and in-memory storage.

**Functions:**
- `getModels()` → Returns 5 models from `data/models.json`
- `getTemplates()` → Returns templates from `data/templates.json`
- `saveTemplate(name, prompt)` → Adds to in-memory array, returns new template
- `deleteTemplate(id)` → Removes from array
- `sendMessage(prompt, model, config)` → Simulates AI response with config details

#### Custom Hooks
- **useChat:** Manages messages array, loading state, sendMessage function
- **useTemplates:** Manages templates array, CRUD operations, loading/error states  
- **useTheme:** Manages current theme, toggle function (from ThemeProvider context)

#### API Routes
- **GET /api/models** → `app/api/models/route.ts` → Calls `mockAPI.getModels()`
- **GET /api/templates** → `app/api/templates/route.ts` → Calls `mockAPI.getTemplates()`
- **POST /api/templates** → Validates input, calls `mockAPI.saveTemplate()`
- **DELETE /api/templates?id=X** → Calls `mockAPI.deleteTemplate(id)`

### Accessibility Features

- **Keyboard Navigation:** All buttons/inputs accessible via Tab, Enter, Escape
- **ARIA Labels:** Descriptive labels on all interactive elements
- **Focus States:** Visible focus rings with `focus:ring-2 focus:ring-ring`
- **Screen Reader Support:** Semantic HTML, proper heading hierarchy
- **Color Contrast:** WCAG AA compliant (4.5:1 for normal text)

### Responsive Design

**Breakpoints:**
```
Mobile: < 768px (full width, drawer sidebar)
Tablet: 768px - 1023px (collapsible sidebar)
Desktop: ≥ 1024px (fixed sidebar + main content)
```

**Implementation:**
- Sidebar: `lg:static` (fixed on desktop), `fixed inset-y-0 -translate-x-full` (hidden on mobile)
- Header: Mobile menu button visible only on `lg:hidden`
- Messages: `max-w-[70%]` on desktop, `max-w-[90%]` on mobile

### Known Limitations

#### 1. Theme Persistence
Theme state uses React state instead of localStorage for Claude artifacts compatibility. In production, uncomment localStorage lines in `ThemeProvider.tsx`:

```typescript
// Load saved theme
const savedTheme = localStorage.getItem('theme') as Theme;
if (savedTheme) setThemeState(savedTheme);

// Save on change
localStorage.setItem('theme', theme);
```

#### 2. Mock API Only
Application uses simulated API responses. To connect real AI:
- Replace `mockAPI` calls with actual API endpoints
- Add API key management (environment variables)
- Implement streaming responses for real-time output
- Handle rate limiting and error responses

#### 3. Template Storage
Templates stored in memory only (resets on refresh). Production should use:
- Database (PostgreSQL, MongoDB)
- Or browser localStorage for client-side persistence

#### 4. No Authentication
Current implementation has no user accounts. Production needs:
- User authentication (NextAuth.js, Clerk, Auth0)
- Per-user template storage
- Session management

---

## Installation & Setup

```bash
# Clone repository
git clone <your-repo-url>
cd ai-playground

# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Run Storybook
npm run storybook
# Open http://localhost:6006

# Build for production
npm run build

# Start production server
npm start
```

---

## Storybook Components

Run `npm run storybook` to view component documentation with interactive examples:

1. **Button** (11 stories) - Variants, sizes, icons, loading states
2. **Slider** (6 stories) - Temperature, max tokens, top-P, disabled, all parameters
3. **Modal** (6 stories) - Basic, with footer, save template, sizes, scrollable
4. **ChatBubble** (5 stories) - User/AI messages, long content, conversation, code blocks

---

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod
```

### Environment Variables
Add these if using real AI APIs:
```
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
```

---

**Built with Next.js 14, TypeScript, and Tailwind CSS**