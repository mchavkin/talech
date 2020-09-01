import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useSelector} from 'react-redux';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    },
});

export default function Loading() {
    const classes = useStyles();
    const loading = useSelector(state => state.loading);
    return (
        <div className={classes.root}>
            {loading && <LinearProgress/>}
        </div>
    );
}

