import {Box} from "@mui/material";
import {LocalShipping} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

type Status = 'delivered' | 'cancelled' | 'unknown';

const getColor = (status: Status, statusColors: Record<Status, string>): string => {
    return statusColors[status];
};

const shipmentStatusColors: Record<Status, string> = {
    delivered: 'green',
    cancelled: 'red',
    unknown: 'black'
};

export const ShipmentDetail = (props: { status: string | undefined, }) => {
    return (
        <Box sx={{width: "50%", textAlign: "center"}}>
            <LocalShipping/>
            <Typography component="div" variant="caption">Detalle del envío</Typography>
            <Typography
                sx={{color: getColor(props.status as Status, shipmentStatusColors)}}>
                {props.status}
            </Typography>
        </Box>
    )
}