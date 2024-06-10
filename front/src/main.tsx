import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import theme from './assets/theme';
import { ThemeProvider } from '@emotion/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserProfile from './pages/UserProfile.tsx';
import App from "./components/App.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/profile/:userId', element: <UserProfile /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>,
)
