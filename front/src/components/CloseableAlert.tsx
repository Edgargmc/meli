import {useState} from "react";
import { Alert, IconButton, Collapse } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import {AlertColor} from "@mui/material";

const CloseableAlert = (props: CloseableAlertProps) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        props.onClose && props.onClose(); // Call the optional onClose callback
    };

    return (
        <Collapse in={open} sx={{ pt:2}} >
            <Alert severity={props.severity} action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }>
                {props.message}
            </Alert>
        </Collapse>
    );
};

export default CloseableAlert;

interface CloseableAlertProps {
    message: string;
    severity: AlertColor;
    onClose: () => void;
}
