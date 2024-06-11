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
import { TransitionProps } from '@mui/material/transitions';
import {useEffect, useState} from "react";
import OrdersServices from "../services/OrdersServices.ts";
import {ShipmentDetails} from "../models/ShipmentDetails.ts";
import {PaymentDetails} from "../models/PaymentDetails.ts";
import ProgressLinear from "./ProgressLinear.tsx";
import {LocalShipping, Payment, Storefront} from "@mui/icons-material";

export const PurchaseDetail = (props: { onClose: () => void, open: boolean, purchase: Purchase }) => {
    const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>()
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>()
    const [isloading, setIsLoading] = useState(false)

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props}/>;
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            Promise.all([
                new OrdersServices().getShipment(props.purchase.shipment_id!),
                new OrdersServices().getPayment(props.purchase.transaction_id!)
            ]).then(([shipmentDetails, paymentDetails]) => {
                setShipmentDetails(shipmentDetails);
                setPaymentDetails(paymentDetails);
            }).finally(() => { setIsLoading(false); });
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (props.open) {
            fetchData();
        }
    }, [props.open]);

    return <Dialog
        onClose={props.onClose}
        open={props.open}
        fullWidth={true}
        maxWidth={"lg"}
        TransitionComponent={Transition}>
        <DialogTitle> Detalle de la compra </DialogTitle>
        <IconButton
            onClick={props.onClose}
            sx={{position: "absolute", right: 8, top: 8,}}>
            <CloseIcon/>
        </IconButton>
        <DialogContent dividers>
            <Card sx={{backgroundColor: "white", mt: 2, display: "flex", flexDirection: "column"}}>
                <CardContent>
                    <Typography component="div" variant="subtitle1" fontWeight={"bold"}>
                        {props.purchase.getDate()}
                    </Typography>
                </CardContent>
                <CardContent sx={{display: "flex"}}>
                    <OrderProductDetail purchase={props.purchase}/>
                    <CardContent sx={{ width: "50%", textAlign: "center"}}>
                        <Storefront/>
                        <Typography component="div" variant="caption">Vendedor</Typography>
                        <Typography component="div" variant="subtitle2">{props.purchase.seller?.nickname}</Typography>
                    </CardContent>
                </CardContent>
            </Card>
            <Paper elevation={6} sx={{mt: 4, display: "flex", p: 6}}>
                { isloading ? <ProgressLinear /> :
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
            <Button onClick={props.onClose} color="info">
                Close
            </Button>
        </DialogActions>
    </Dialog>;
}