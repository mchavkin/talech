import React, {useState} from "react";
import AddEditProduct from "../../AddEditProduct/AddEditProduct";
import {useDispatch} from "react-redux";
import {addEntry, clearMessage} from "../../../redux/actions";

export default function NewProduct() {
    const dispatch = useDispatch();
    dispatch(clearMessage());
    const onSubmit = (entry) => dispatch(addEntry(entry));
    const inputs = {
        name: '',
        ean: '',
        type: '',
        weight: '',
        active: '',
        quantity: '',
        price: '',
        color: []
    };
    return (
        <AddEditProduct onSubmit={onSubmit} initialInputs={inputs}/>
    )
}
