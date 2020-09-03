import React from "react";
import {useHistory, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import Card from "@material-ui/core/Card";
import {Typography} from "@material-ui/core";
import useTranslation from "../../../utils/useTranslation";
import {getEntry, removeEntry} from "../../../redux/actions";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        margin: theme.spacing(4),
    },
    body: {
        margin: theme.spacing(2)
    },
    buttons: {
        margin: theme.spacing(3)
    }
}))

export default function Preview() {
    const {id} = useParams();
    const {t} = useTranslation();
    const history = useHistory();
    const classes = useStyle();
    const loading = useSelector(state => state.loading);
    const entry = useSelector(state => state.selectedEntry);
    const dispatch = useDispatch();

    const deleteEntry = () => {
        dispatch(removeEntry(entry.ean));
        history.push('/');
    }
    const editEntry = () => history.push(`/${entry.ean}/edit`)

    if (loading) dispatch(getEntry(id));
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography variant={"h6"} className={classes.body}>
                    {`${t('product')} ${t('field.ean')}: ${id}`}
                </Typography>

                {entry && Object.getOwnPropertyNames(entry).map(property => (
                    <Typography variant={"body1"} key={property} className={classes.body}>
                        <span>{`${t(`field.${property}`)}: `}</span>
                        <span>
                            {
                                Array.isArray(entry[property]) ?
                                    entry[property].join(', ') :
                                    entry[property]}
                        </span>
                    </Typography>
                ))}
                <div className={classes.buttons}>
                    <Button>
                        <Button variant="contained" color="primary"
                                onClick={editEntry}>
                            {t('buttons.edit')}
                        </Button>
                        <Button variant="outlined" color="primary"
                                onClick={deleteEntry}>
                            {t('buttons.delete')}
                        </Button>
                    </Button>
                </div>
            </Card>
        </div>
    )
}
