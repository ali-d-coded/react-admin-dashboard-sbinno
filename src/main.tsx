import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import Login from './pages/Auth/Login.tsx';
import Users from './pages/Users/Users.tsx';
import Settings from './pages/Settings/Settings.tsx';
import PrivateRoute from './components/auth/PrivateRoute.tsx';


const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
       {
        element: <App />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
