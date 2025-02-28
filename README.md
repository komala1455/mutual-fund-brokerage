# Mutual Fund Broker Web Application

## Overview
This application provides a backend and frontend solution for a mutual fund brokerage firm. It enables user authentication, fetching and storing mutual fund data, portfolio management, and automated updates.

## Tech Stack
### Backend
- **Framework:** FastAPI
- **Database:** PostgreSQL
- **Cache:** Redis
- **API Integration:** RapidAPI (for mutual fund data)
- **Authentication:** JWT

### Frontend
- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** TBD (React Context, Redux, or React Query)

---

## Backend Implementation

### Setup
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run PostgreSQL and Redis.
3. Start FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

### API Endpoints
- **User Registration:** `POST` http://0.0.0.0:8001/users/register/
- **Login:** `POST` http://0.0.0.0:8001/users/login/
- **List All Funds:** `GET` http://0.0.0.0:8001/funds/funds
- **Fund Details:** `GET` http://0.0.0.0:8001/funds/mutual-funds/?fund_name=Aditya%20Birla%20Sun%20Life%20Mutual%20Fund
- **Create Portfolio:** `POST` http://0.0.0.0:8001/portfolio/
- **View Portfolio:** `GET` http://0.0.0.0:8001/portfolio/investments/

### Postman Collection
- Documentation: [View on Postman](https://documenter.getpostman.com/view/42725756/2sAYdhKVn8)

---

## Frontend Implementation

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

### ESLint Configuration
To enable type-aware linting in ESLint, update your configuration as follows:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Use `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the configuration:

```js
import react from 'eslint-plugin-react';

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: { react },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

---

## Future Enhancements
- UI Improvements with a modern design framework (Material-UI, Tailwind, Ant Design, etc.)
- State management integration (Redux, React Query, or Context API)
- Advanced analytics and reporting features
- Real-time price updates using WebSockets


