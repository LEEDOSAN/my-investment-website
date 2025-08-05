# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a Korean stock investment landing page application with an admin panel for managing user applications. The project consists of two main parts:

### Frontend Structure
- **Main Landing Page** (`index.html`): A stock investment consultation signup form with animations and testimonials
- **Admin Panel** (`admin/`): Login-protected dashboard for managing user applications
- **Styling**: Separate CSS files for main site (`css/style.css`) and admin (`css/admin.css`)
- **Images**: Background images and assets stored in `images/` directory

### Key Components

#### Main Application (`index.html`, `js/script.js`)
- Investment consultation signup form with fields:
  - Name, contact, investment type, investment amount, referral source
- Form data stored in localStorage with site identifier ('site1') 
- Real-time application status display with animated new entries
- Smooth scroll animations and intersection observers for visual effects
- Responsive design optimized for mobile

#### Admin System (`admin/`, `js/admin-dashboard.js`, `js/admin-login.js`)
- **Login**: Simple credential-based auth (admin/admin123) with 24-hour session
- **Dashboard**: Tabbed interface supporting multiple sites (site1 active, site2 planned)
- **Data Management**: View, update status, and delete user applications
- **Dynamic Fields**: FORM_FIELDS object synced between main and admin for consistency

## Data Flow

1. Users fill out form on main page (`index.html`)
2. Form data saved to localStorage with `site: 'site1'` identifier
3. Admin can view/manage data through dashboard (`admin/dashboard.html`)
4. Status updates (대기중/상담완료/미완료) persist in localStorage

## Development Commands

Since this is a static HTML/CSS/JS project, no build system is configured. Development is done by:

- Opening `index.html` directly in browser for main site testing
- Opening `admin/login.html` for admin functionality testing
- Using browser dev tools for debugging and responsive testing

## Key Configuration

- **Admin Credentials**: username: `admin`, password: `admin123`
- **Session Duration**: 24 hours auto-logout
- **Form Fields**: Defined in `FORM_FIELDS` object in both main and admin JS files
- **LocalStorage Keys**: 
  - `applications`: Array of all form submissions
  - `adminLoggedIn`: Boolean for auth state
  - `adminLoginTime`: Session timestamp

## Architecture Notes

- No server-side backend - all data stored in browser localStorage
- Modular form field system allows easy addition of new fields
- Admin dashboard dynamically generates table columns based on FORM_FIELDS
- Mobile-first responsive design with extensive CSS animations
- Korean language interface throughout