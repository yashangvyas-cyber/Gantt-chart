# Rules for every CollabCrawl prototype (Antigravity)
Read CLAUDE.md in this folder and in the prototype's own folder first.

## Flow review (UX thinking allowed, UX inventing not) — added 7 Oct, applies to EVERY prototype under CollabCrawl
Use this when planning or reviewing a flow. It decides the STEPS. CollabCRM decides the LOOK. These rules win over any UX skill or general "best practice".
1. **Planning only.** Use this checklist before building or when reviewing a flow. Never while editing code.
2. **Check every flow for:**
   - a clear start (where the person comes from) and a clear end (where they land after)
   - a way back from every screen
   - every error has a way out: retry, go back, or who to contact
   - every screen's edge cases: empty (nothing yet), error, loading, no permission, and "what if the other person never replies"
   - only what is needed at that step; extra detail one click away
   - few choices per screen; lists in groups, not walls
   - who sees what: every label and status must be true for each viewer (Employee, Company Admin, Agent, Lead, Tech)
3. **Every step must map to a real CollabCRM screen or component** (name the spec / capture file). If none exists, it may be built as **NEW** without waiting (BA, 8 Oct 2026 — brief v2 Rule 7b): only CollabCRM classes, tokens and `icon-*` names, modelled on the closest real component, marked `DIVERGES: NEW`, and listed at Stop C. Never build a NEW piece silently.
4. **Never use** patterns from a UX skill that CollabCRM does not have: no BottomNav, PageShell, TopBar, carousel, hero sections, skeleton rules, "3 taps" rules. The real component, class and label always win.
5. **Global skills `design-ux` and `avoid-ai-writing` find problems only.** design-ux = usability findings ranked blocker / major / minor;
   avoid-ai-writing = plain-English wording. Neither may change a class, component, icon, layout or a label copied from CollabCRM.
   Fixes go through the normal copy-from-the-capture rules. Never install StyleSeed / mobile / "design generator" skills for these prototypes.
