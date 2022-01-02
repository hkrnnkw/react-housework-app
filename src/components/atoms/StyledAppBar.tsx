import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.default,
  '& div.MuiToolbar-regular': {
    width: `calc(100% - ${theme.spacing(4)}px)`,
    minHeight: '44px',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
  },
}));

export default StyledAppBar;
