import React from "react";
import {useHistory} from "react-router";
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Checkbox} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import useTranslation from "../../../utils/useTranslation";
import {useDispatch, useSelector} from "react-redux";
import {editEntry, getPage} from "../../../redux/actions";


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
}));

export default function List() {
    const classes = useStyles();
    const {t} = useTranslation();
    const history = useHistory();
    const loading = useSelector(state => state.loading);
    const entries = useSelector(state => state.entries);
    const dispatch = useDispatch();

    if (loading) dispatch(getPage());

    const handleActiveChange = (entry) => {
        const newEntry = {...entry, active: !entry.active}
        dispatch(editEntry(entry.ean, newEntry));
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
                                    <Button onClick={() => history.push(`/${product.ean}`)}>
                                        {t('buttons.view')}
                                    </Button>
                                    <Button onClick={() => history.push(`/${product.ean}/edit`)}>
                                        {t('buttons.edit')}
                                    </Button>
                                    <Button>
                                        {t('buttons.delete')}
                                    </Button>
                                </TableCell>

                            </TableRow>
                        )}
                    </TableBody>

                </Table>

            </Paper>
        </div>
    )
}

