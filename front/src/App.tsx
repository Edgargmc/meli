import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon, ListItemText,
  Toolbar
} from "@mui/material"
import { Link, Outlet } from "react-router-dom"
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar'
import MailIcon from '@mui/icons-material/Mail';
import {ShoppingBag} from "@mui/icons-material";

const drawerWidth = 240;

const App = () => {
  return (
    <>
      <Container maxWidth="xl">
        <AppBar
            position="fixed"
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
          <Toolbar>
            <Box sx={{flexGrow: 1}}>
              <Link to={`/`}>
                <Typography variant="h6" component="h6" sx={{mb: 2}}> Home </Typography>
              </Link>
            </Box>
            <Link to={`/profile/1`}>
              <Button color="inherit">Perfil</Button>
            </Link>
          </Toolbar>
        </AppBar>
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
        <Container sx={{backgroundColor: '#ededed', pt: 2}}>
          <Outlet/>
        </Container>
      </Container>
    </>
)
}

export default App
