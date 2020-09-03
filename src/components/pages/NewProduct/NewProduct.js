import React from "react";
import AddEditProduct from "../../AddEditProduct/AddEditProduct";
import {useDispatch} from "react-redux";
import {addEntry, clearMessage} from "../../../redux/actions";
import {useHistory} from "react-router";

export default function NewProduct() {
    const dispatch = useDispatch();
    const history = useHistory();
    dispatch(clearMessage());
    const onSubmit = (entry) => dispatch(addEntry(history, entry));
    const inputs = {
        name: '',
        ean: '',
        type: '',
        weight: '',
        active: true,
        quantity: '',
        price: '',
        color: []
    };
    return (
        <AddEditProduct onSubmit={onSubmit} initialInputs={inputs}/>
    )
}
