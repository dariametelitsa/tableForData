# React + TypeScript + Vite

This project is a web application for exploring character data from the "Rick and Morty" series. The data is fetched from the public Rick and Morty API. Built with modern frontend technologies, the app includes features like data sorting, filtering, theme switching, and modal windows for image previews.

## Installation and Setup
### Prerequisites

    Node.js installed (recommended version: 18.x or higher).
    pnpm installed (npm install -g pnpm).

## Instructions

1. Clone the repository:
```sh
    git clone <repository_URL>
    cd <folder_name>
```

2. Install dependencies:
```sh
    pnpm install
```

3. Run the project in development mode:

```sh
    pnpm dev
```
The app will be available at http://localhost:5173 (or another port specified in the console).

4. Build for production:
```sh
    pnpm build
```

## Project Structure
```
├── src/
│   ├── components/   # React components
│   ├── hooks/        # Custom hooks
│   ├── api/          # API requests and TanStack Query setup
│   ├── entity/       # Main app entity
│   ├── shared/       # Common data for project
│   └── App.tsx       # Main application component
├── public/           # Static files
└── package.json      # Dependency and script configuration
```

### Technologies Used:

**pnpm** — Package manager for fast and efficient dependency management.

**Vite** — Build tool and development server with fast Hot Module Replacement (HMR).

**TypeScript** — Static typing for improved code reliability.

**React** — Library for building user interfaces.

**TanStack Query** — Asynchronous data management and API request caching.

**Material-UI (MUI)** — Component library for a modern UI, including the DataGrid component.

### Features

**API Data**: Characters are loaded from the public Rick and Morty API.

**Light and Dark Themes**: Theme switching is available in the app header.

**Data Table**: Uses MUI’s DataGrid component with sorting and filtering support.

**Modal Windows**: Clicking a character’s image opens a modal with an enlarged version and additional data.


## Additional Features

1. **Sorting and Filtering**: Implemented via DataGrid for efficient data handling. Filtering by field type.
2. **Data Caching**: TanStack Query optimizes API requests and reduces load times.


### Usage Example

Open the app in your browser.
Switch between light and dark themes using the header toggle.
Browse the character table, sort, or filter the data.
Click a character’s image to view it in a modal window.