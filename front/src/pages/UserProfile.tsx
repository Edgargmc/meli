import { useEffect } from "react";
import {Box, Card, CardContent, CardMedia, Container, Grid} from "@mui/material"
import Typography from "@mui/material/Typography";
import CloseableAlert from "../components/CloseableAlert";
import {PurchasesList} from "../components/PurchasesList";
import Progress from "../components/Progress.tsx";
import {useUserProfile} from "../hooks/useUserProfile";

const UserProfile = () => {
    const { state, fetchData, handleAlertClose } = useUserProfile();

    useEffect(() => {
        fetchData();
    }, []);

    const printAlerts = () => {
        return <>
            {state.restrictions && state.restrictions.map((r, index) => (
                <CloseableAlert
                    key={index}
                    message={r.message}
                    severity={r.type}
                    onClose={() => handleAlertClose(index)}
                />
            ))}
        </>;
    }

    return(
        <Container style={{ height: "126vh", display: "flex"}}>
                <Container sx={{mt: 10, backgroundColor: '#ffffff', width: '100%'}}>
                    { state.isLoading ?
                        (<Progress/>): state.user && (
                            <>
                                <Card>
                                    <CardContent sx={{display: 'flex'}}>
                                        <CardMedia
                                            component="img"
                                            sx={{width: 90, borderRadius: '50%'}}
                                            image={state.user.profile_image}
                                            alt="Live from space album cover"
                                        />
                                        <Box sx={{display: 'flex', flexDirection: 'column', ml: 4}}>
                                            <Typography component="div" variant="h5">
                                                {state.user.name} {state.user.surname}
                                            </Typography>
                                            <Typography component="div" variant="h6">
                                                Estàs en nivel: {state.user.level}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                                {printAlerts()}
                            </>
                        )
                    }
                    { state.user && <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <PurchasesList userId={state.user.user_id} />
                        </Grid>
                    </Grid>
                    }
                </Container>
        </Container>
    )
}

export default UserProfile