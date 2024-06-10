import Purchase from "../models/Purchase.ts";
import { CardContent, CardMedia, Box, Typography } from '@mui/material';

const OrderProductDetail = (props: { purchase: Purchase }) => {
    return (
        <CardContent sx={{ display: 'flex', width: '50%' }}>
            <CardMedia
                component="img"
                sx={{ width: 80, border: '1px solid black', borderRadius: '6%' }}
                image={props.purchase.image}
                alt={props.purchase.image}
            />
            <Box sx={{ ml: 4 }}>
                <Typography component="div" variant="overline">
                    {props.purchase.title}
                </Typography>
                <Typography component="div" variant="caption">
                    {props.purchase.amount} u.
                </Typography>
                <Typography component="div" variant="caption">
                    {props.purchase.cost?.total} {props.purchase.cost?.currency}
                </Typography>
            </Box>
        </CardContent>
    );
};

export default OrderProductDetail;
