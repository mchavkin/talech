import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../redux/actions";
import useTranslation from "../../utils/useTranslation";

export default function MessageDisplay() {
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const {t} = useTranslation();
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
                    {t(message.message)}
                </MuiAlert>
            )}
        </Snackbar>
    );
}
