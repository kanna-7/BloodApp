# Bloodmate – Save Lives, Donate Blood

A complete blood donation platform connecting donors with those in need. Built with React, Vite, and a unique design system.

## Features

### Donors
- **Registration** – Sign up as a blood donor with full details
- **Eligibility Check** – Weight, height, BMI validation (min 45 kg, BMI 18.5–29.9)
- **Donation Type** – Choose free (voluntary) or paid donation
- **Profile** – Blood group, location, mobile, and eligibility status
- **Social Feed** – Instagram-like feed to share stories and encouragement
- **Emergency Alerts** – Receive urgent blood requests in your area

### Seekers (People Who Need Blood)
- **Registration** – Create an account to find donors
- **Find Donors** – Search by location and filter by blood group
- **Contact Donors** – Direct call option for each donor
- **Emergency Request** – Send urgent alerts to eligible donors

### Admin Dashboard
- **Admin Login** – `admin@bloodmate.com` / `admin123`
- **Overview** – Total donors, seekers, total logins, unique users who logged in
- **Usage Stats** – Logins today, last 7 days, donor/seeker login breakdown
- **Login History** – All login events saved with user, email, type, timestamp
- **Platform Usage** – Emergencies, feed posts, engagement metrics

### Emergency System
- **Emergency Buzzer** – Send urgent blood requests to all eligible donors
- **Location-Based** – Alerts shown to donors in the same area
- **Active Alerts** – Visible in dashboard and navbar when active

## Tech Stack

- React 19 + Vite 7
- React Router DOM
- Local Storage (demo persistence)
- CSS custom properties for design tokens

## Getting Started

```bash
cd bloodmate-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # Navbar, etc.
├── context/        # AuthContext, DataContext
├── pages/          # Landing, Login, Signup, Dashboards
├── utils/          # eligibility.js (BMI/weight/height check)
├── App.jsx
├── main.jsx
└── index.css       # Design system
```

## Design System

- **Colors**: Blood crimson (#c41e3a), warm cream, charcoal
- **Fonts**: Space Grotesk (headings), Outfit (body)
- **Shadows**: Soft blood-tinted shadows
- **Eligibility**: WHO/NHS-style rules (45 kg min, BMI 18.5–29.9)

---

© 2025 Bloodmate – Save lives, donate blood.
