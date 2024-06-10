import {Container} from "@mui/material"
import {Outlet} from "react-router-dom"
import {NavigationHeader} from "./NavigationHeader.tsx";
import {NavigationDrawer} from "./NavigationDrawer.tsx";

const App = () => {
  return (
    <>
      <Container maxWidth="xl">
        <NavigationHeader zIndex={(theme) => theme.zIndex.drawer + 1}/>
        <NavigationDrawer/>
          <Outlet/>
      </Container>
    </>
)
}

export default App
