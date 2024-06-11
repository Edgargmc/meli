import React from 'react';
import Purchase from "../models/Purchase.ts";
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton, Paper, Slide
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import OrderProductDetail from "./OrderProductDetail.tsx";
import ProgressLinear from "./ProgressLinear.tsx";
import {LocalShipping, Payment, Storefront} from "@mui/icons-material";
import {TransitionProps} from "@mui/material/transitions/transition";
import {usePurchaseDetails} from "../hooks/usePurchaseDetails.ts";


const Transition = React.forwardRef(function Transition(props:TransitionProps, ref) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props}/>;
});

export const PurchaseDetail = ({ onClose, open, purchase }: PurchaseDetail) => {
    const {shipmentDetails, paymentDetails, isLoading, error} = usePurchaseDetails(purchase, open)
    return <Dialog
        onClose={onClose}
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
        TransitionComponent={Transition}>
        <DialogTitle> Detalle de la compra </DialogTitle>
        <IconButton
            onClick={onClose}
            sx={{position: "absolute", right: 8, top: 8,}}>
            <CloseIcon/>
        </IconButton>
        <DialogContent dividers>
            <Card sx={{backgroundColor: "white", mt: 2, display: "flex", flexDirection: "column"}}>
                <CardContent>
                    <Typography component="div" variant="subtitle1" fontWeight={"bold"}>
                        {purchase.getDate()}
                    </Typography>
                </CardContent>
                <CardContent sx={{display: "flex"}}>
                    <OrderProductDetail purchase={purchase}/>
                    <CardContent sx={{ width: "50%", textAlign: "center"}}>
                        <Storefront/>
                        <Typography component="div" variant="caption">Vendedor</Typography>
                        <Typography component="div" variant="subtitle2">{purchase.seller?.nickname}</Typography>
                    </CardContent>
                </CardContent>
            </Card>
            <Paper elevation={6} sx={{mt: 4, display: "flex", p: 6}}>
                { isLoading ? (<ProgressLinear />):
                    error ? (
                            <Typography variant="body2" color="error">
                                Error fetching purchase details
                            </Typography>
                        ) :
                    <>
                        <Box sx={{ width: '50%', textAlign: "center"}}>
                            <LocalShipping/>
                            <Typography component="div" variant="caption">Detalle del envío</Typography>
                            <Typography>{shipmentDetails?.status}</Typography>
                        </Box>
                        <Box sx={{ width: '50%', textAlign: "center"}}>
                            <Payment/>
                            <Typography component="div" variant="caption">Detalle del Pago</Typography>
                            <Typography>{paymentDetails?.status}</Typography>
                        </Box>
                    </>
                }
            </Paper>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="info">
                Close
            </Button>
        </DialogActions>
    </Dialog>;
}

interface PurchaseDetail {
    onClose: () => void;
    open: boolean;
    purchase: Purchase;
}