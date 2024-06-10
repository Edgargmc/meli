import {
    Container,
    Divider,
    Drawer, DrawerProps,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material"
import {Outlet} from "react-router-dom"
import MailIcon from '@mui/icons-material/Mail';
import {ShoppingBag} from "@mui/icons-material";
import {NavigationHeader} from "./components/NavigationHeader.tsx";

const drawerWidth = 240;

const NewComponent = () => (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar/>
            <Divider/>
            <List>
                {['Compras', 'Starred'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <ShoppingBag/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </Drawer>
    )


const App = () => {
  return (
    <>
      <Container maxWidth="xl">
        <NavigationHeader zIndex={(theme) => theme.zIndex.drawer + 1}/>
        <NewComponent/>
          <Outlet/>
      </Container>
    </>
)
}

export default App
