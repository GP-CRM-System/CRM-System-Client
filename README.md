
# CRM System Client

This is a modern, responsive CRM (Customer Relationship Management) web application client built with React and Vite. It provides a robust interface for managing contacts, companies, deals, tickets, orders, employees, analytics, and more.

## Features

- **Authentication & Authorization**: Secure login, registration, and permission-based UI using a flexible PermissionGuard system.
- **Contacts Management**: Create, view, filter, and paginate contacts with modal forms and responsive tables.
- **Companies, Deals, Tickets, Orders, Employees**: Modular pages for managing all CRM entities.
- **Sidebar Navigation**: Responsive, collapsible sidebar with permission-aware navigation and custom scrollbar.
- **Pagination**: Efficient server-side pagination for large datasets.
- **Responsive Design**: Fully mobile-friendly and desktop-optimized UI using Tailwind CSS.
- **API Integration**: Uses React Query for efficient data fetching and caching.
- **Modern Stack**: Built with React, Vite, Tailwind CSS, React Query, and more.

## Tech Stack

- React 18+
- Vite
- Tailwind CSS
- React Query (@tanstack/react-query)
- Axios
- ESLint

## Getting Started

1. **Install dependencies:**
	```bash
	npm install
	```

2. **Start the development server:**
	```bash
	npm run dev
	```

3. **Open your browser:**
	Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

- `src/pages/` — Main page components (dashboard, contacts, companies, etc.)
- `src/components/` — Shared UI components (Sidebar, PageLayout, PermissionGuard, etc.)
- `src/api/` — API client and endpoint definitions
- `src/store/` — State management (auth, query client)
- `src/assets/` — Icons and images
- `src/utils/` — Utility functions

## Customization

- **Permissions**: Update `PermissionGuard` and user permissions in the store to control access to features.
- **API Endpoints**: Configure endpoints in `src/api/endpoints.js` to match your backend.
- **Styling**: Tailwind CSS is used for rapid, responsive design.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
