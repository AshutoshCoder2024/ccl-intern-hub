# Frontend

This directory contains the React frontend application for the CCL Intern Hub.

## Structure

```
frontend/
├── src/                    # Source code
│   ├── pages/             # React page components
│   ├── components/        # Reusable React components
│   │   └── ui/           # Shadcn UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── data/             # Static data files
│   ├── assets/           # Images and static assets
│   ├── App.tsx           # Main app component
│   └── main.tsx          # React entry point
├── public/               # Public static files
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── index.html           # HTML entry point
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

- **Vite**: Configured in `vite.config.ts`
- **TypeScript**: Configured in `tsconfig.json`
- **Tailwind CSS**: Configured in `tailwind.config.ts`
- **ESLint**: Configured in `eslint.config.js`

## API Integration

The frontend connects to the backend API running on `http://localhost:5000`. The proxy is configured in `vite.config.ts`.

