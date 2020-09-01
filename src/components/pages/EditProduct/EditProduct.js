import React from "react";
import {Redirect, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {editEntry, clearMessage, loading} from "../../../redux/actions";
import AddEditProduct from "../../AddEditProduct/AddEditProduct";

export default function EditProduct() {
    const {id} = useParams();
    const entry = useSelector(state => state.entries.find(entry => id === entry.ean));
    const dispatch = useDispatch();
    const onSubmit = (entry) => dispatch(editEntry(id, entry));

    dispatch(clearMessage());
    if (!entry) dispatch(loading());
    return (
        <>
            {!entry ? <Redirect to={'/'}/>:
            <AddEditProduct onSubmit={onSubmit} initialInputs={entry}/>}
        </>
    )
}
