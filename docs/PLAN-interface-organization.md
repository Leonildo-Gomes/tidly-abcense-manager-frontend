# Plan: Interface Development - Organization Module & Sidebar

> **Status:** PLANNING
> **Progress:** 0/6 Tasks Completed

## 1. Overview

This plan covers the implementation of the main application shell (Sidebar) and the "Organization" module interface. This module is the foundation of the multi-tenant structure, allowing management of Companies, Teams (Departments), and Employees. All entities will have both a **List View** and a **Form View** (Create/Edit).

## 2. Project Type & Stack

- **Type:** WEB (Frontend Focus)
- **Framework:** Next.js 16 (App Router)
- **Styling:** TailwindCSS
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **State/Data:** React Query (TanStack Query) - *Suggested for data fetching*

## 3. File Structure & Routes

Based on `MVP_SPECIFICATION.md`, we will implement the following routes in `src/app/(dashboard)`:

```text
src/app/(dashboard)/
├── layout.tsx                  # Main App Shell (Sidebar + Header)
├── page.tsx                    # Dashboard Home (Redirect or Stats)
└── organization/
    ├── companies/
    │   ├── page.tsx            # List View
    │   └── [id]/               # Edit/View (or use modals)
    ├── teams/ (departments)
    │   ├── page.tsx            # List View
    │   └── [id]/
    └── employees/
        ├── page.tsx            # List View
        └── [id]/
```

## 4. Task Breakdown

### Phase 1: Application Shell (Sidebar)

- [ ] **[UI] Implement Sidebar Component** <!-- id: 1 -->
  - **Agent:** `frontend-specialist`
  - **Input:** `MVP_SPECIFICATION.md` (Module structure)
  - **Output:** `src/components/layout/sidebar.tsx` with navigation links to Organization, Configuration, and Workflow modules.
  - **Verify:** Responsive sidebar that collapses/expands and links to correct routes.

- [ ] **[UI] Create Dashboard Layout** <!-- id: 2 -->
  - **Agent:** `frontend-specialist`
  - **Input:** Sidebar component
  - **Output:** `src/app/(dashboard)/layout.tsx` integrating Sidebar and Header.
  - **Verify:** All child pages render within this layout.

### Phase 2: Organization Module - Company

- [ ] **[UI] Company List View** <!-- id: 3 -->
  - **Agent:** `frontend-specialist`
  - **Output:** `src/app/(dashboard)/organization/companies/page.tsx`
  - **Components:** `CompanyList` table with search/filter.
  - **Verify:** Displays list of dummy companies.

- [ ] **[UI] Company Form (Create/Edit)** <!-- id: 4 -->
  - **Agent:** `frontend-specialist`
  - **Output:** `src/components/modules/organization/company/company-form.tsx`
  - **Fields:** Name, Code, Tax ID (Org Number), Address.
  - **Verify:** Form validates inputs and logs data on submit.

### Phase 3: Organization Module - Teams & Employees

- [ ] **[UI] Teams (Departments) Interface** <!-- id: 5 -->
  - **Agent:** `frontend-specialist`
  - **Output:** `src/app/(dashboard)/organization/teams/page.tsx` & `team-form.tsx`
  - **Fields:** Name, Parent Unit (for hierarchy), Manager.
  - **Verify:** Able to list teams and see form for new team.

- [ ] **[UI] Employee Interface** <!-- id: 6 -->
  - **Agent:** `frontend-specialist`
  - **Output:** `src/app/(dashboard)/organization/employees/page.tsx` & `employee-form.tsx`
  - **Fields:** Name, Email, Role, Team, Hire Date.
  - **Verify:** Able to list employees and see form for new employee.

## 5. Verification Plan (Phase X)

- [ ] **Lint Check:** `npm run lint` matches no errors.
- [ ] **Build Check:** `npm run build` succeeds.
- [ ] **Manual UX Audit:**
  - Sidebar navigation works on Desktop & Mobile.
  - Forms show validation errors for empty required fields.
  - List views respond to empty states.

## 6. Development Progress Tracker

*Use this section to track which interfaces are "Done".*

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Sidebar Navigation** | ✅ Done | Implemented with responsive layout |
| **Company: List** | 🔴 Todo | |
| **Company: Form** | 🔴 Todo | |
| **Team: List** | 🔴 Todo | |
| **Team: Form** | 🔴 Todo | |
| **Employee: List** | 🔴 Todo | |
| **Employee: Form** | 🔴 Todo | |
