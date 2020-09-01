import React from "react";
import {useHistory} from "react-router";
import {Button, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import useTranslation from "../../../utils/useTranslation";
import {initialData} from "../../../persistence/initialData"


const fields = ['name', 'ean', 'type', 'weight', 'color', 'active', 'quantity', 'price'];

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
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function List() {
    const classes = useStyles();
    const {t} = useTranslation();
    const history = useHistory();


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {fields.map(fieldName =>
                                <TableCell
                                    id={fieldName}
                                    key={fieldName}
                                >
                                    {t(`field.${fieldName}`)}
                                </TableCell>
                            )
                            }
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {initialData.map(product =>
                            <TableRow
                                key={product.ean}
                                selected={!product.quantity}
                            >
                                {fields.map((fieldName, i) =>
                                    <TableCell key={i}>
                                        {product[fieldName]}
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

