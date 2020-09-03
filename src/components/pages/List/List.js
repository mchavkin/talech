import React from "react";
import {useHistory} from "react-router";
import {Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import useTranslation from "../../../utils/useTranslation";
import {useDispatch, useSelector} from "react-redux";
import {
    changeSortingDirection,
    getEntries,
    removeEntry,
    saveEditedEntry,
    selectEntry,
    setSortBy
} from "../../../redux/actions";
import ListPaginator from "./ListPaginator";
import TableSortLabel from "@material-ui/core/TableSortLabel";


const fields = [
    {name: 'name', sortable: true},
    {name: 'ean', sortable: true},
    {name: 'type', sortable: false},
    {name: 'weight', sortable: false},
    {name: 'color', sortable: false},
    {name: 'quantity', sortable: true},
    {name: 'price', sortable: true},
];

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
    const sortBy = useSelector(state => state.sortBy);
    const direction = useSelector(state => state.direction);
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

    const handleSort = (field) => {
        if (field === sortBy) {
            dispatch(changeSortingDirection());
        } else {
            dispatch(setSortBy(field));
        }
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
                            {fields.map(field =>
                                <TableCell
                                    id={field.name}
                                    key={field.name}
                                >
                                    {field.sortable ?
                                        <TableSortLabel
                                            active={sortBy === field.name}
                                            direction={sortBy === field.name ? direction : 'asc'}
                                            onClick={() => handleSort(field.name)}
                                        >
                                            {t(`field.${field.name}`)}
                                        </TableSortLabel>
                                        :
                                        t(`field.${field.name}`)
                                    }
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

                                {fields.map((field, i) =>
                                    <TableCell key={i}>
                                        <span>{
                                            Array.isArray(product[field.name]) ?
                                                product[field.name].join(', ') :
                                                product[field.name]
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

