import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Layout} from "./Layout.tsx";
import UserProfile from "./UserProfile.tsx";
import {ThemeProvider} from "@mui/material";
import theme from "../assets/theme.tsx";
import {Home} from "./Home.tsx";

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
