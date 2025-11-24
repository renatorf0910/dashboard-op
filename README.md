# Dashboard-Op

This project is a dashboard to view assets and devices, with filters, loading/empty/error states, and note persistence via IndexedDB.

---

## Prerequisites

* **Git** and **Node.js / npm** installed
* Ports **3000** and **8000** available

---

## Installation and Running

Clone the repository:

```bash
git clone https://github.com/renatorf0910/dashboard-op.git
cd dashboard-op
```

Create a `.env` file with the following variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Install dependencies:

```bash
npm install
```

### Running on Different Environments

#### Mac

```bash
npm run dev          # runs the app at http://localhost:3000
npm run json-server  # runs the mock API at http://localhost:8000
```

#### Ubuntu

```bash
npm run dev          # runs the app at http://localhost:3000
npm run json-server  # runs the mock API at http://localhost:8000
```

> Make sure ports 3000 and 8000 are open in the firewall.

#### Windows (PowerShell)

```powershell
npm run dev          # runs the app at http://localhost:3000
npm run json-server  # runs the mock API at http://localhost:8000
```

> If you have permission issues, run PowerShell as administrator.

---

## Optional Modules Used

* **Dexie**: for working with IndexedDB, storing notes linked to assets without needing an extra database.
* **Dagre + React Flow**: to render graphs and flows visually.
* **Lucide React**: free icon library with good support.
* **Framer Motion**: for smooth animations and interactions.

---

## Loading / Empty / Error States

* **Loading**: skeletons appear when entering **Assets** and **Devices** pages.
* **Empty**: perform a search that returns no results to see the empty state.
* **Error**: the **Side Bar** has an error page showing handled error types.

---

## Quick Notes

* **Query keys**: used for caching and data revalidation.
* **Filter ↔ URL sync**: filters update the URL, allowing shareable links.
* **IndexedDB**: stores notes linked to assets, avoiding the need for a separate database.

> This setup improves security and local data persistence.

