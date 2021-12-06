import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    height: '100vh',
    overflowY: 'hidden',
    borderRadius: 0,
    boxShadow: 'none',
    background: theme.palette.background.paper,
    '& div.MuiGrid-container': {
        height: '100%',
        margin: 0,
        padding: theme.spacing(0, 0, 0, 14),
        '& a': {
            textDecoration: 'none',
        },
    },
}));

export default StyledPaper;
