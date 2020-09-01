import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../redux/actions";

export default function MessageDisplay() {
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const handleClose = () => dispatch(clearMessage());
    return (
        <Snackbar
            open={!!message}
            onClose={handleClose}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            {message
            && (
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={message.severity}
                    onClose={handleClose}
                >
                    {message.message}
                </MuiAlert>
            )}
        </Snackbar>
    );
}
