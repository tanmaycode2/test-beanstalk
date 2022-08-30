import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from "@mui/material/Backdrop";

export const Preloader = (props) => {
  return (
    <Backdrop
        sx={{ color: "#fff", zIndex: '9000' }}
        open={!props.flag}
        >
        {
            !props.flag ? <CircularProgress color="inherit" /> : ""
        }
    </Backdrop>
  );
}