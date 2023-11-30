# Employable Dev Application Setup Guide

## Overview
This guide provides detailed instructions for setting up the Employable Dev application, a Next.js-based web application with Ethereum smart contract integration and resume management features.

## Application Structure

### Directories and Files

- `.next`: Generated files for the Next.js application.
- `.vercel`: Configuration files for Vercel deployment.
- `components`: Reusable UI components.
  - `carousel`: Carousel component for UI sliders.
    - `Carousel.tsx`: Carousel functionality.
  - `Header`: Layout header component.
  - `modals`: Modal components.
    - `AIModal`: Modal for AI interactions.
  - `specific`: Specific components for the Resume feature.
    - `ResumeEditor`: Components for editing resumes.
      - `Education.tsx`: Manages education entries in resumes.
      - `ResumeEditor.tsx`: Core resume editing functionalities.
      - `ResumeList.tsx`: Lists and manages resumes.
      - `ResumeManagement.tsx`: Orchestrates resume editing and management.
      - `ResumeViewer.tsx`: Component for viewing resumes.
  - `Card.tsx`: Generic card UI component.
- `coverage`: Test coverage reports.
- `features`: Cucumber feature files for behavior-driven development (BDD).
- `hooks`: Custom React hooks.
  - `useAuth.ts`: Hook for authentication management.
- `node_modules`: Node.js modules.
- `pages`: Next.js pages.
  - `api`: Backend API endpoints.
    - `auth`: Authentication APIs.
    - `[id].ts`: API for specific ID operations.
    - `getResume.ts`: Fetches resume data.
    - `github.ts`: GitHub integration.
    - `resume.ts`: Resume-related operations.
  - `resume`: Pages for resume functionalities.
    - `microservices`: Pages for specific microservices.
    - `portfolio.tsx`: Portfolio management page.
    - `professional-reference-bot.tsx`: Reference bot functionality page.
    - `resume.tsx`: Resume page with extended functionalities.
  - `_app.tsx`: Main application setup.
  - `index.tsx`: Homepage.
- `prisma`: Prisma ORM schema.
- `smartContracts`: Ethereum smart contracts.
  - `ApplicationBinaryInterfaces`: ABI for smart contracts.
  - `AdminSetter.sol`: Smart contract for admin settings.
- `step-definitions`: Cucumber step definitions for BDD.
- `styles`: CSS stylesheets.
- `tests`: Test suites.
- `types`: TypeScript type definitions.
  - `index.ts`: Centralized type definitions.
- Configuration files: `.babelrc`, `.env`, `.eslintrc.json`, etc.

## Setup Instructions

1. **Clone the Repository**: Clone the project repository to your local machine.

2. **Install Dependencies**: Run `npm install` or `yarn install` to install all necessary dependencies.

3. **Configure Environment Variables**: Set up the `.env` file with the required environment variables (API keys, database URLs, etc.).

4. **Start the Application**: Execute `npm run dev` or `yarn dev` to start the development server.

5. **Access the Application**: Open `http://localhost:3000` in your browser to view the application.

## Dependencies and Documentation

Below is a list of key dependencies used in the project:

- [Next.js](https://nextjs.org/docs): The React framework for server-side rendering and static site generation.
- [React](https://reactjs.org/docs/getting-started.html): A JavaScript library for building user interfaces.
- [Prisma](https://www.prisma.io/docs/): ORM for database management.
- [Ethereum](https://ethereum.org/en/developers/docs/): Platform for building decentralized applications (DApps) using smart contracts.
- [Cucumber](https://cucumber.io/docs): Tool for BDD testing.
- [Jest](https://jestjs.io/docs/getting-started): JavaScript Testing Framework.

## Code Functionality and Architecture

### Frontend (React/Next.js)

- The application leverages Next.js for server-side rendering and static site generation.
- `components` directory contains reusable UI parts, with specific components tailored for resume functionality.
- Custom hooks, like `useAuth`, manage state and side effects.
- `pages` define the UI and behavior for different routes.

### Backend (APIs)

- Server-side logic is handled by API routes in the `pages/api` directory.
- Resume operations and GitHub integration are managed through these APIs.

### Smart Contracts

- Ethereum smart contracts in the `smartContracts` directory manage blockchain interactions.
- `AdminSetter.sol` sets and gets admin addresses.

### Database and ORM

- Prisma ORM is used, with the schema defined in `schema.prisma`.

### Testing

- BDD approach is indicated by `features` and `step-definitions`.
- Jest is used for unit and integration testing.

### Configuration

- Configuration files ensure code transpiling, linting, and type safety.
- `next.config.js` configures Next.js specific settings.

This architecture facilitates a scalable, maintainable, and testable application, combining React's component-based approach with Next.js's server-side capabilities, enhanced by Ethereum smart contract interactions.