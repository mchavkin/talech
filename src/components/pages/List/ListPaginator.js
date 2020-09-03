import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import {useDispatch, useSelector} from "react-redux";
import {loading, setEntriesPerPage, setPage} from "../../../redux/actions";
import useTranslation from "../../../utils/useTranslation";

export default function ListPaginator(){
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const count = useSelector(state => state.total);
    const entriesPerPage = useSelector(state => state.entriesPerPage);
    const page = useSelector(state => state.page);

    const handleChangePage = (event, newPage) => {
        dispatch(setPage(newPage));
        dispatch(loading());
    }
    const handleChangeEntriesPerPage = (event) => {
        dispatch(setEntriesPerPage(parseInt(event.target.value, 10)));
        handleChangePage(null,0);
    }

    const labelDisplayedRows = ({ from, to, count }) =>`${from}-${to} ${t('pagination.of')} ${count}`

    return(
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={entriesPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeEntriesPerPage}
                labelRowsPerPage = {t('pagination.rowsPerPage')}
                labelDisplayedRows = {labelDisplayedRows}
            />
        )
}
