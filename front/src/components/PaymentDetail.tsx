import {Box} from "@mui/material";
import {Payment} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

type Status = 'cancelled' | 'completed' | 'rejected' | 'unknown';

const getColor = (status: Status, statusColors: Record<Status, string>): string => {
    return statusColors[status];
};

const paymentStatusColors: Record<Status, string> = {
    cancelled: 'red',
    completed: 'green',
    rejected: 'orange',
    unknown: 'black'
};

export const PaymentDetail = (props: { status: string | undefined, }) => {
    return (
        <Box sx={{width: '50%', textAlign: "center"}}>
            <Payment/>
            <Typography component="div" variant="caption">Detalle del Pago</Typography>
            <Typography
                sx={{color: getColor(props.status as Status, paymentStatusColors)}}>
                {props.status}
            </Typography>
        </Box>
    )
}