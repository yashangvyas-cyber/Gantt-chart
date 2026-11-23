# Gantt Chart Prototype Audit: Real vs Hallucinated

## 1. Asli Kaam Ki Cheeze (70% - Solid & Production-Ready)
1. **Real CollabCRM UI Shell & Filter Bar:**
   - 2-tier header layout, Avatar Stack (`[EC] [LB] [SR]...`) with click-to-filter.
   - Standard Create Issue Modal (popup, no drawer) with exact CollabCRM fields.
   - Sprints pinned top row with status badges (In Progress, Ends in X days).

2. **Billing-Model Aware Rules (Exact Business Logic):**
   - **Fixed Cost:** Milestones visible on timeline with deliverable markers.
   - **Hourly:** No milestones; Expiry date line & hours tracking.
   - **Hire Base:** Developer contract allocation (no fake milestones).

3. **Core Timeline Drag & Drop (Story 1 & 2):**
   - Adjusting Start/Due dates by dragging bars directly updates the issue.
   - Status color coding (Todo, In Progress, QA, Done).

4. **Multi-Project Executive Dashboard (Story 8):**
   - Management view to see across all active projects and team capacity.

---

## 2. Hallucinated / Over-Engineered Cheeze (30% - R&D Imagination)
1. **Baseline Freeze (Story 5):**
   - *Reality:* CollabCRM me baseline ka koi backend table ya history tracking nahi hai.
   - *Verdict:* Fancy feature from MS Project/Jira Enterprise. Real agency PMs seedha date change karte hain.

2. **Critical Path Calculation (Story 4/5) [HATA DIYA GAYA]:**
   - *Status:* Poori tarah se drop kar diya gaya hai.
   - *Reason:* ClickUp/MS Project ka heavy waterfall concept (DuPont 1950s) jo construction/engineering me use hota hai. IT agency ke 2-week agile sprints me iski koi real utility nahi hai. Prototype UI se toggle button, amber highlights, aur Critical Chain End badge poori tarah se clean kar diye gaye hain.

3. **Auto-Cascading Dependency Shifts [HATA DIYA GAYA]:**
   - *Status:* Poori tarah se drop kar diya gaya hai.
   - *Final Flow:* CollabCRM me task links sirf visual rehte hain. Agar blocker delay hota hai to dependency line RED highlight hoti hai (conflict alert), lekin koi bhi task auto-shift nahi hota taaki developers ka schedule aur calendar disturb na ho.

4. **Quarter / Year Zoom on Task Level:**
   - *Reality:* Tasks 2-week ya 1-month ke horizon me plan hote hain. Quarter zoom sirf Story 8 dashboard ke liye real hai, task board ke liye noise hai.
