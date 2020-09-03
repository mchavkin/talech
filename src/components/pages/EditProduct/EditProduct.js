import React from "react";
import {Redirect, useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage, loading, saveEditedEntry} from "../../../redux/actions";
import AddEditProduct from "../../AddEditProduct/AddEditProduct";

export default function EditProduct() {
    // const {id} = useParams();
    const history = useHistory();
    const selectedEntry = useSelector(state => state.selectedEntry);
    const dispatch = useDispatch();
    const onSubmit = (entry) => dispatch(saveEditedEntry(selectedEntry.ean, entry, history));

    dispatch(clearMessage());
    if (!selectedEntry) dispatch(loading());
    return (
        <>
            {!selectedEntry ? <Redirect to={'/'}/> :
                <AddEditProduct onSubmit={onSubmit} initialInputs={selectedEntry}/>}
        </>
    )
}
