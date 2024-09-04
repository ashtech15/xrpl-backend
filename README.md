# XRPL-Backend

## Table of Contents

- [XRPL-Backend](#xrpl-backend)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Technology Stack](#technology-stack)
  - [Setup and Installation](#setup-and-installation)
  - [Environment Variables](#environment-variables)
  - [License](#license)

## Introduction

XRPL-Backend is a server-side application that leverages XRPL's NFTs to provide a secure, decentralized, blockchain-based contract service.

## Technology Stack

- **Backend:**

  - [Node.js](https://nodejs.org/): A JavaScript runtime for building server-side applications.
  - [Express](https://expressjs.com/): A web application framework for Node.js.
  - [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript that adds types and compiles to plain JavaScript.
  - [XRPL](https://xrpl.org/): A library for interacting with the XRP Ledger.

- **Frontend:**

  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript that adds types and compiles to plain JavaScript.
  - [Vite](https://vitejs.dev/), [ESLint](https://eslint.org/), and [Prettier](https://prettier.io/): Tools for building the application, linting code, and formatting code.
  - [Tanstack Query](https://tanstack.com/query) and [Zustand](https://github.com/pmndrs/zustand): Libraries for managing application state.
  - [Tailwind](https://tailwindcss.com/) and [Shadcn/ui](https://ui.shadcn.com/): Libraries for styling the application and managing layout.

## Setup and Installation

Follow these steps to set up and run this project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ashtech15/xrpl-backend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd xrp-backend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

## Environment Variables

This project uses the following environment variables:

- `PORT`: The port on which the backend server runs.
- `XRPL_PROVIDER`: The URL of the XRP Ledger provider.
- `CORS_ORIGIN`: The origin allowed to access the server (for CORS policy).

You can set these environment variables in a `.env` file in the root of your project. Remember to replace the example values with your actual values.

```properties
PORT=''
XRPL_PROVIDER = ''
CORS_ORIGIN = ('', '')
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
