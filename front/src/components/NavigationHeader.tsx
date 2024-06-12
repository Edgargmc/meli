import AppBar from "@mui/material/AppBar";
import {Box, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";

// eslint-disable-next-line
// @ts-ignore
export const NavigationHeader = (props: {zIndex: (theme) => number }) => (
        <AppBar
            position="fixed"
            sx={{zIndex: props.zIndex}}
        >
            <Toolbar>
              <Box sx={{flexGrow: 1}}>
                <Link to={`/`}>
                    <img
                        style={{ width: "160px", height: "50px", padding: "4px"}}
                        src={"https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.55/mercadolibre/logo_large_25years@2x.png"}/>
                </Link>
              </Box>
            </Toolbar>
          </AppBar>
    );