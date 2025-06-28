# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a corporate website for 合同会社MJSカンパニー (MJS Company LLC), a medical DX company led by a practicing physician. The site serves as both a corporate portfolio and a customer acquisition funnel for three main business services:

1. **AI Voice Input Tool 'KaruStep'** - Medical AI scribe system for doctors
2. **Medical Institution DX Support** - Digital transformation consulting for small medical facilities  
3. **Medical Article Writing & Supervision** - Content creation and medical supervision for web media

## Target Deployment

- **Platform**: GitHub Pages
- **Domain**: mjscompany.github.io
- **Primary Conversion Goal**: Contact form submissions for business inquiries

## Technology Stack

### Frontend Architecture
- **HTML5** with semantic structure
- **CSS3** with custom styles (no framework dependencies)
- **Vanilla JavaScript** with GSAP animations
- **Static site** - no build process or package.json required

### Key Dependencies (CDN)
- **GSAP 3.13.0**: Primary animation library
  - Core: `https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js`
  - ScrollTrigger: `https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js`
- **Font Awesome 6.7.2**: Icons - `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css`
- **Noto Sans JP**: Primary font family
- **destyle.css 4.0.1**: CSS reset

## File Structure & Architecture

```
/
├── index.html              # Main landing page (hub for all services)
├── css/
│   └── style.css          # Main stylesheet (currently deleted, needs recreation)
├── js/
│   ├── main.js            # Primary JavaScript functionality
│   └── heroarea-animation.js # WebGL hero area animation
├── img/                   # Image assets
│   ├── mjs_logo.png       # Company logo
│   ├── ceo_doctor_img.jpg # CEO profile photo
│   ├── karustep_hero.png  # KaruStep hero image
│   ├── karustep-appwindow.png # Product screenshot
│   ├── karustep-PCscreenshot.png # PC application view
│   └── footswitch.jpg     # Hardware component photo
└── *.md files             # Documentation and requirements
```

## Design System

### Color Palette
- **Base (Background)**: White (`#FFFFFF`)
- **Main (Text/Headers)**: Deep Blue (`#0D2C54`) - conveys medical trust
- **Accent (CTAs/Links)**: Blue-to-purple gradient (`#0D2C54` → `#1E90FF` → `#8A2BE2`)
- **Text**: Dark Gray (`#333333`)

### Typography
- **Primary Font**: `Noto Sans JP` (weights: 300, 400, 500, 600, 700)

## Site Architecture

### Navigation Structure
```
Header Navigation:
├── 事業内容 (Services) [Dropdown]
│   ├── AI音声入力『カルステップ』 → External LP (https://karustep.netlify.app/)
│   ├── 医療機関DX化支援 → Anchor link on index.html
│   └── 医療記事 執筆・監修 → Dedicated page
├── 実績・事例 (Cases) → cases.html
├── 私たちについて (About) → about.html
├── お知らせ (News) → news section
└── お問い合わせ (Contact) → contact.html [CTA Button]
```

### Page Responsibilities
- **index.html**: Central hub directing visitors to appropriate services
- **about.html**: Detailed company info and CEO profile (company-info.md content)
- **cases.html**: Portfolio with filterable categories
- **contact.html**: Lead capture form with service-specific inquiry types

## Development Guidelines

### Hero Area Animation
- **Technology**: WebGL-based animation (heroarea-animation.js)
- **Theme**: Data transformation visualization with medical/AI aesthetics
- **Visual**: Grid-based background with floating geometric particles
- **Performance**: Must load quickly and run smoothly on mobile devices

### Content Integration
- **Company Info**: Reference `company-info.md` for all company details
- **Service Descriptions**: Follow detailed specifications in `requirements.md`
- **Image Assets**: All images located in `/img/` directory

### Contact Form Requirements
**Mandatory Fields**:
- 会社名 (Company Name)
- 氏名 (Full Name) 
- メールアドレス (Email)
- 電話番号 (Phone)
- お問い合わせ種別 (Inquiry Type) [Required Dropdown]:
  - AI音声入力『カルステップ』について
  - 医療機関DX化支援について  
  - 医療記事 執筆・監修について
  - その他
- お問い合わせ内容 (Message) [Textarea]

## SEO & Meta Configuration

### Required Meta Tags
- Comprehensive OGP (Open Graph Protocol) setup
- Twitter Card configuration  
- Japanese language optimization (`lang="ja"`, `locale="ja_JP"`)
- Medical/healthcare focused keywords

### External Links
- **KaruStep Product LP**: https://karustep.netlify.app/
- **Yahoo News Articles**: Multiple medical content examples in company-info.md

## Development Commands

Since this is a static site with no build process:
- **Development**: Open `index.html` in browser or use local server
- **Testing**: Manual browser testing across devices
- **Deployment**: Direct commit to GitHub Pages

## Current Development Status

**Note**: The CSS files have been deleted and the JavaScript files are empty. The project needs:
1. Complete CSS recreation following the design system
2. Implementation of GSAP animations in main.js
3. WebGL hero animation in heroarea-animation.js
4. Additional HTML pages (about.html, cases.html, contact.html)