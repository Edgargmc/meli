import {Outlet} from "react-router-dom";
import {NavigationHeader} from "../components/NavigationHeader.tsx";
import {NavigationDrawer} from "../components/NavigationDrawer.tsx";

export const Layout = () => {
    return (
        <>
            <NavigationHeader zIndex={(theme) => theme.zIndex.drawer + 1}/>
            <NavigationDrawer/>
            <Outlet/>
        </>
    )
}