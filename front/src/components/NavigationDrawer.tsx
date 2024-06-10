import {Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import {Person2} from "@mui/icons-material";
import {Link} from "react-router-dom";

const drawerWidth = 240;

export const NavigationDrawer = () => (
    <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}
        variant="permanent"
        anchor="left">
        <Toolbar/>
        <Divider/>
        <List>
            <ListItem disablePadding>
                <Link to={`/profile/1`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Person2/>
                        </ListItemIcon>
                            <ListItemText primary={'Perfil'}/>
                    </ListItemButton>
                </Link>
            </ListItem>
        </List>
        <Divider/>
    </Drawer>
)