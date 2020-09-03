import React from "react";
import {useHistory} from "react-router";
import {Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import useTranslation from "../../../utils/useTranslation";
import {useDispatch, useSelector} from "react-redux";
import {getEntries, removeEntry, saveEditedEntry, selectEntry} from "../../../redux/actions";
import ListPaginator from "./ListPaginator";


const fields = ['name', 'ean', 'type', 'weight', 'color', 'quantity', 'price'];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(1),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    bottomButton: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(3)
    }
}));

export default function List() {
    const classes = useStyles();
    const {t} = useTranslation();
    const history = useHistory();
    const loading = useSelector(state => state.loading);
    const entries = useSelector(state => state.entries);
    const dispatch = useDispatch();

    if (loading) dispatch(getEntries());

    const handleActiveChange = (entry) => {
        const newEntry = {...entry, active: !entry.active}
        dispatch(saveEditedEntry(entry.ean, newEntry));
    }

    const deleteEntry = (ean) => {
        dispatch(removeEntry(ean));
    }

    const handleSelectEntry = (entry, edit) => {
        dispatch(selectEntry(entry));
        history.push(`/${entry.ean}${edit ? '/edit' : ''}`);
    }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                id='active'
                            >
                                {t(`field.active`)}
                            </TableCell>
                            {fields.map(fieldName =>
                                <TableCell
                                    id={fieldName}
                                    key={fieldName}
                                >
                                    {t(`field.${fieldName}`)}
                                </TableCell>
                            )}
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map(product =>
                            <TableRow
                                key={product.ean}
                                selected={!product.quantity}
                            >
                                <TableCell>
                                    <Checkbox
                                        checked={product.active}
                                        onClick={() => handleActiveChange(product)}
                                        color="primary"
                                    />
                                </TableCell>

                                {fields.map((fieldName, i) =>
                                    <TableCell key={i}>
                                        <span>{
                                            Array.isArray(product[fieldName]) ?
                                                product[fieldName].join(', ') :
                                                product[fieldName]
                                        }
                                        </span>
                                    </TableCell>
                                )}
                                <TableCell>
                                    <Button variant="outlined" color="primary"
                                            onClick={() => {
                                                handleSelectEntry(product);
                                            }}>
                                        {t('buttons.view')}
                                    </Button>
                                    <Button variant="contained" color="primary"
                                            onClick={() => handleSelectEntry(product, true)}>
                                        {t('buttons.edit')}
                                    </Button>
                                    <Button variant="contained" color="primary"
                                            onClick={() => deleteEntry()}>
                                        {t('buttons.delete')}
                                    </Button>
                                </TableCell>

                            </TableRow>
                        )}
                    </TableBody>

                </Table>
                <ListPaginator/>
                <div className={classes.bottomButton}>
                    <Button variant="contained" color="primary" onClick={() => history.push('/create')}>
                        {t('buttons.new')}
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

