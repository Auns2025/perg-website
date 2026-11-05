# PERG Technical Services LLC — Corporate Website

A premium corporate single-page website for **PERG Technical Services LLC** (Dubai, UAE), specialized in electromechanical engineering, turnkey MEP contracting, and industrial technical solutions.

---

## 🛠 Technology Stack

- **Framework:** React.js (JSX)
- **Styling:** Tailwind CSS (Custom UAE engineering palette & typography system)
- **Build Tool:** Vite
- **Animations:** GSAP & ScrollTrigger (subtle upward reveals, prefers-reduced-motion safe)
- **Smooth Scrolling:** Lenis smooth scrolling with native fallback
- **Icons:** Lucide React (functional interface icons)
- **Brand Colors:** Corporate Blue (`#075A9C`), Deep Engineering Blue (`#063B70`), Bright Technical Blue (`#087DCE`), Light Blue (`#EAF4FB`), Charcoal (`#17212B`)
- **Typography:** Manrope (Headings 500-800) & Inter (Body/UI 300-700)

---

## 📁 Project Architecture

```
Perg-Website/
├── public/
│   ├── images/                      # Authentic high-resolution photography
│   │   ├── hero-commercial-building.jpg
│   │   ├── about-engineering.jpg
│   │   ├── service-hvac.jpg
│   │   ├── service-electrical.jpg
│   │   ├── service-plumbing.jpg
│   │   ├── service-firefighting.jpg
│   │   ├── service-elv.jpg
│   │   ├── capabilities-engineering.jpg
│   │   ├── safety-engineer-ppe.jpg
│   │   └── corporate-cta-bg.jpg
│   └── logo/                        # Authentic extracted PERG logos
│       ├── logo-perg.png            # Transparent blue logo
│       └── logo-perg-white.png      # Transparent white inverted logo
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx               # Sticky nav, responsive mobile menu, real logo, quick-dial
│   │   ├── Hero.jsx                 # Full-width photographic hero, H1, dual CTAs, stats
│   │   ├── About.jsx                # Who We Are, 2-column, core strengths & delivery promise
│   │   ├── Services.jsx             # 5 core MEP disciplines in asymmetric editorial layout
│   │   ├── BusinessSegments.jsx     # 4 segments: Manufacturing, Contracting, Consultancy, Supply
│   │   ├── Capabilities.jsx         # 8 interactive competencies with accessible accordion
│   │   ├── Process.jsx              # 6-stage engineering timeline (concept to maintenance)
│   │   ├── Projects.jsx             # 32 verified projects, category filters, interactive view-more
│   │   ├── QualitySafety.jsx        # Quality, Safety & HSE policies with PPE photography
│   │   ├── Values.jsx               # Inspiration, Integrity, Accountability, Partnership
│   │   ├── CTA.jsx                  # Deep blue corporate call-to-action
│   │   ├── Contact.jsx              # Damac XL Towers address, phones, working inquiry mailto handoff
│   │   └── Footer.jsx               # White logo, full sitemap, legal registration, dynamic year
│   ├── data/
│   │   ├── companyData.js           # Exact profile facts, licenses, contacts, manpower (76)
│   │   ├── servicesData.js          # Core services, business segments, capabilities, process
│   │   └── projectsData.js          # 32 completed UAE projects from official pre-qualification
│   ├── hooks/
│   │   └── useSmoothScroll.js       # Lenis smooth scrolling hook
│   ├── App.jsx                      # Main app orchestrator with GSAP ScrollTrigger
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global typography, scrollbars, and Tailwind directives
├── index.html                       # Semantic HTML5, Google Fonts, Open Graph SEO tags
├── tailwind.config.js               # Corporate design tokens
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Running the Project Locally

To run the development server:

```bash
npm run dev
```

The application will be live at `http://localhost:5173/`.

To build for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📋 Verified Company Facts (from `PERG PROFILE.pdf`)

- **Company Name:** PERG Technical Services LLC
- **Established:** 2018 in Dubai, UAE
- **Group:** Part of PERG Group (Associate: Konarc Point Technical Services LLC)
- **Trade License:** 815588 (Dubai)
- **Chamber of Commerce:** 109641
- **Head Office:** Suite 703 Damac XL Towers, Business Bay, Dubai, UAE
- **Operations:** P.O. Box 124610, Bur Dubai, Dubai, UAE
- **Contact:** +971 4 583 0191 / +971 55 625 7273 / +971 4 242 4575 | sales@pergglobal.com
- **Workforce:** 76 total dedicated personnel (2 Project Managers, 4 Project Engineers, 4 Site Engineers, 6 Supervisors, 34 Technicians, etc.)
- **Completed Projects Track Record:** 32 verified projects across ADNOC, DEWA, Dubai Media City, Abu Dhabi Islamic Bank, BurJuman Centre, DAFZA, Etihad Airways, Yas Water Park, Dubai Golf Club, and more.
