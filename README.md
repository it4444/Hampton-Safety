# Hampton Safety Ltd Website

Professional health and safety consultancy website built with Next.js 14, featuring modern design, responsive layouts, and optimized performance.

## 🚀 Live Site

Deployed on Netlify: [Hampton Safety Ltd](https://your-netlify-domain.netlify.app)

## 📋 Project Overview

Hampton Safety Ltd provides bespoke health and safety consultancy services across the UK, specializing in:
- Retained H&S Consultancy
- Risk Assessments & Audits
- Management Systems (ISO certification support)
- Safety Training (IOSH, NEBOSH, and bespoke programs)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Netlify
- **Forms**: Netlify Forms

## 🎨 Brand Colors

- **Primary Blue (Hampton Blue)**: `#0855A1`
- **Navy Blue**: `#002952`
- **Medium Blue**: `#1e73be`
- **Success Green**: `#10b981`
- **Light Blue Background**: `#EBF5FF`

## 📁 Project Structure

```
hampton-safety-website/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage
│   │   ├── about/                   # About page
│   │   ├── contact/                 # Contact form
│   │   └── services/                # Service pages
│   │       ├── consultancy/
│   │       ├── risk-assessments/
│   │       ├── iso-certification/
│   │       └── training/
│   ├── components/
│   │   ├── Navigation.tsx           # Header navigation
│   │   ├── Footer.tsx               # Footer component
│   │   └── ui/                      # shadcn/ui components
│   └── lib/
│       └── utils.ts                 # Utility functions
├── public/
│   ├── images/                      # Hero and content images
│   └── logos/                       # Brand assets
└── docs/
    └── image-requirements.md        # Image guidelines

```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/it4444/Hampton-Safety.git

# Navigate to project directory
cd hampton-safety-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Recent Updates

### Button Styling Consistency (Latest)
- Fixed invisible CTA buttons across all service pages and footer
- Standardized button color scheme for consistent branding
- Updated navigation header with single Hampton blue CTA button
- Applied fixes to: consultancy, risk-assessments, training, ISO certification, about pages, and footer

### Homepage Hero Image
- Added professional consultation image to homepage hero section
- Showcases on-site consultancy approach with factory setting
- Optimized for responsive viewing with smooth animations

### Form Integration
- Netlify Forms integration for contact page
- Built-in spam protection and submission handling
- Success/error state management

### TypeScript & Linting
- Resolved all TypeScript errors for clean Netlify deployments
- Fixed ESLint warnings and build issues

## 📄 Key Pages

- **Home** (`/`) - Hero section, services overview, testimonials
- **About** (`/about`) - Company mission, approach, and accreditations
- **Contact** (`/contact`) - Contact form with Netlify Forms integration
- **Services**:
  - Consultancy (`/services/consultancy`)
  - Risk Assessments (`/services/risk-assessments`)
  - Management Systems (`/services/iso-certification`)
  - Training (`/services/training`)

## 🎨 Design System

The site uses a custom design system with:
- **Typography**: Custom heading and body styles with `.hampton-*` classes
- **Components**: Consistent card, button, and badge styling
- **Color Scheme**: Professional blue and green palette
- **Responsive**: Mobile-first design with Tailwind breakpoints

## 🔧 Configuration

### Tailwind Config
Custom colors, animations, and utilities defined in `tailwind.config.ts`

### Next.js Config
Image optimization and build settings in `next.config.ts`

### TypeScript Config
Strict type checking enabled in `tsconfig.json`

## 📦 Dependencies

Key packages:
- `next` - React framework
- `react` & `react-dom` - UI library
- `tailwindcss` - Utility-first CSS
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `@radix-ui/*` - Headless UI components (via shadcn/ui)

## 🌐 Deployment

The site is automatically deployed to Netlify on push to `master` branch:
- **Production**: Deploys from `master` branch
- **Deploy Previews**: Automatic for all branches and PRs
- **Forms**: Handled by Netlify Forms with spam protection

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature-name

# Make changes and commit
git add .
git commit -m "Description of changes"

# Push branch
git push -u origin feature-name

# Merge to master when ready
git checkout master
git merge feature-name
git push origin master
```

## 📚 Documentation

- Image requirements and prompts: `docs/image-requirements.md`
- Brand guidelines: See color palette in this README
- Component usage: See shadcn/ui documentation

## 🤝 Contributing

This is a private project for Hampton Safety Ltd. For questions or updates, contact the development team.

## 📄 License

Private and proprietary - Hampton Safety Ltd © 2024

---

Built with ❤️ using Next.js and deployed on Netlify
