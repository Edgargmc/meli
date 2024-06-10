import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Progress() {
    return (
        <Box sx={{ display: 'flex', height: '300px', width: '100%', justifyContent: 'center' }}>
            <CircularProgress color={'secondary'} />
        </Box>
    );
}
