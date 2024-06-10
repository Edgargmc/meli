import Purchase from "../models/Purchase.ts";
import {Box, Button, Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import OrderProductDetail from "./OrderProductDetail.tsx";
import {Storefront} from "@mui/icons-material";


export const PurchasesItem = (props: { purchase: Purchase, detailPurchase: () => void }) => {
    return (
    <Card sx={{backgroundColor: "white", mt: 2, display: "flex", flexDirection: "column"}}>
        <CardContent>
            <Typography component="div" variant="subtitle1" fontWeight={"bold"}>
                {props.purchase.getDate()}
            </Typography>
        </CardContent>
        <CardContent sx={{display: "flex"}}>
            <OrderProductDetail
                purchase={props.purchase}
            />
            <CardContent sx={{display: "flex", width: "25%"}}>
                <Box sx={{display: "flex", flexDirection: "column", flexGrow: 2}}>
                    <Box sx={{textAlign: "center"}}>
                        <Storefront/>
                        <Typography component="div" variant="subtitle2">{props.purchase.seller?.nickname}</Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardContent sx={{display: "flex", width: "25%"}}>
                <Button
                    variant="contained"
                    onClick={props.detailPurchase}
                    sx={{width: "180px", height: "40px", backgroundColor: "#2f4ab8", color: "white"}}>
                    Ver compra
                </Button>
            </CardContent>
        </CardContent>
    </Card>
    )}