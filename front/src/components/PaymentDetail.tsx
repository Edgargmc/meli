import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { SvgIconComponent } from "@mui/icons-material";
import {Payment, LocalShipping} from "@mui/icons-material";

type Status = 'cancelled' | 'completed' | 'rejected' | 'unknown' | 'delivered';

const statusColors: Record<Status, string> = {
    cancelled: 'red',
    completed: 'green',
    rejected: 'orange',
    unknown: 'black',
    delivered: 'green'
};

const simulateTranslations: Record<Status, string> = {
    cancelled: 'Cancelada',
    completed: 'Completada',
    rejected: 'Rechazada',
    unknown: 'Desconocida',
    delivered: 'Entregada'
};

const getColor = (status: Status, statusColors: Record<Status, string>): string => {
    return statusColors[status];
};

const getTranslation = (status: Status): string => {
    return simulateTranslations[status];
};

export const Detail = ({ status, title, Icon }: DetailProps) => {
    return (
        <Box sx={{ width: '50%', textAlign: "center" }}>
            <Icon />
            <Typography component="div" variant="caption">{title}</Typography>
            <Typography sx={{ color: getColor(status as Status, statusColors) }}>
                {getTranslation(status as Status)}
            </Typography>
        </Box>
    );
};

export const PaymentDetail = (props: { status: string | undefined  }) => {
    return <Detail status={props.status} title="Detalle del Pago" Icon={Payment} />;
};

export const ShipmentDetail = (props: { status: string | undefined }) => {
    return <Detail status={props.status} title="Detalle del envío" Icon={LocalShipping} />;
};

interface DetailProps {
    status: string | undefined;
    title: string;
    Icon: SvgIconComponent;
}
