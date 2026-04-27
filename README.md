# Petly

Web platform for managing domestic animals, users, and reviews. The project is split into two parts:

- **Frontend** in Vue 3 + Vite
- **Backend** in NestJS + TypeORM + SQLite

## Team

- Alejandro Arteaga
- Alejandra Suárez
- Camila Velez

## Main Technologies

- Vue 3
- Vite
- Pinia
- Vue Router
- Chart.js
- NestJS
- TypeORM
- SQLite

## Project Structure

```text
Petly/
├── backend/
└── frontend/
```

## Requisitos previos

- Node.js 20 o superior
- npm
## Requirements
## Instalación

Instala las dependencias en cada carpeta:

## Installation
cd backend
Install the dependencies in each folder:

cd ../frontend
npm install
```

## How to Run the Project

Open two terminals, one for the backend and one for the frontend.

### Backend

```bash
cd backend
npm run start:dev
```

The backend runs at:

- `http://localhost:3000`
- API base: `http://localhost:3000/api`

### Frontend

```bash
cd frontend
npm run dev
```

The frontend usually runs at:

- `http://localhost:5173`

## Useful Scripts

### Frontend

```bash
npm run dev        # Development
npm run build      # Production build
npm run preview    # Preview the build
```

### Backend

```bash
npm run start:dev  # Development with hot reload
npm run build      # Production build
npm run start      # Run the compiled build
npm run test       # Unit tests
```

## Main Features

- User registration and login
- User profile with editable information
- Domestic animal catalog
- Animal reviews
- Admin dashboard
- Domestic animal management
- User management

## Notes

- The backend uses SQLite, so the local database is stored inside the project.
- The frontend consumes the backend API through `http://localhost:3000/api`.
- If you change the backend port, make sure to update the frontend configuration as well.
