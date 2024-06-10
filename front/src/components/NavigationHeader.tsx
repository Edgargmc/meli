import AppBar from "@mui/material/AppBar";
import {Box, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const NavigationHeader = (props: {zIndex: (theme) => number }) => (
        <AppBar
            position="fixed"
            sx={{zIndex: props.zIndex}}
        >
            <Toolbar>
              <Box sx={{flexGrow: 1}}>
                <Link to={`/`}>
                  <Typography variant="h6" component="h6" sx={{mb: 2}}> Home </Typography>
                </Link>
              </Box>
            </Toolbar>
          </AppBar>
    );