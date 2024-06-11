import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Layout} from "../pages/Layout.tsx";
import UserProfile from "../pages/UserProfile.tsx";
import {ThemeProvider} from "@mui/material";
import theme from "../assets/theme.tsx";
import {Home} from "../pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <Home/>},
      { path: '/profile/:userId', element: <UserProfile /> },
    ]
  }
]);

const App = () => {
  return (
      <>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </>
  )
}

export default App
