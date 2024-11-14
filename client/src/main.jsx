import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import App from './App.jsx'
import ErrorPage from './routes/Errorpage.jsx';
import Index, {action as IndexAction} from './routes/Index.jsx';
import Login, {action as LoginAction} from './routes/Login.jsx';
import Register, {action as RegisterAction}  from './routes/Register.jsx';
import HomePage, {loader as HomeLoader} from './routes/HomePage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
        action: IndexAction,
      },
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "register",
        element: <Register />,
        action: RegisterAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "home",
        element: <HomePage />,
        loader: HomeLoader,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

