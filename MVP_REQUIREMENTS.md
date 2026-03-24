# flatmate.ch MVP Requirements

## 🎯 Goal: The "Vibe-Check" Prototype
Build a working prototype that demonstrates "Chemistry-First" matching for the Swiss WG market.

## 🏗 Requirements (Must-Have)

### 1. The Chemistry Profile (v1)
- [ ] **Person Profile:** 5-7 core personality "sliders" (e.g., Quiet ↔ Social, Messy ↔ Clean).
- [ ] **Collective WG Profile:** EVERY member of the WG must complete the profile/quiz to create an aggregate "house vibe."
- [ ] **Interests:** A secondary matching layer (tags like "Cooking together," "Outdoor sports," "Board games").
- [ ] **Photo Gallery:** Minimal focus on the room, maximum focus on life in the WG.

### 2. Mandatory Onboarding Metadata
- [ ] **Price:** Monthly rent (CHF).
- [ ] **Location:** Specific City and Canton.
- [ ] **Availability:** Move-in date and duration (if limited).

### 3. The Matching Interface
- [ ] **Discovery Feed:** Card-based UI for browsing people/WGs.
- [ ] **Compatibility Score:** A % match shown on each card based on the profile sliders.
- [ ] **Filters:** Basic location (City/Canton) and Price range.

### 4. The "Vibe-Check" Loop
- [ ] **Request Interaction:** Button to "Send Vibe-Check" (Initial contact).
- [ ] **Success State:** Simple visual confirmation when a match/request is sent.

### 5. Technical Setup
- [ ] **Next.js 15+ (App Router)**
- [ ] **Tailwind CSS 4**
- [ ] **shadcn/ui**
- [ ] **Supabase** (Initial Schema for Profiles & Matches)

## 🎨 Aesthetic & UX (VIBE.md alignment)
- **Swiss Minimal:** Clean, lots of whitespace, high-quality typography (Inter/Geist).
- **Smooth Transitions:** Use Framer Motion for card swipes and profile transitions.

## 🚀 Future Use Cases
- **Duo Applicants:** Two people (couples/friends) applying together as a single unit.
- **WG Handover:** An entire WG dissolving and passing the entire flat/lease to a new group.

## 🚫 Out of Scope for MVP
- Real-time Video calls.
- Integrated payment systems.
- Advanced AI-driven personality analysis (stick to sliders for now).
- Professional photography services.

---
**Status:** 📝 Draft (Awaiting Sign-off from Shain & Noah)
