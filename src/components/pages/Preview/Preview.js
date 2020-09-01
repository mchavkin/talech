import React from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";

export default function Preview() {
    const {id} = useParams();
    const entry = useSelector(state => state.entries.find(entry => id === entry.ean));
    return (
        <div>
            {JSON.stringify(entry)}
        </div>
    )
}
