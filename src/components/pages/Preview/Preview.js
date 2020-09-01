import React from "react";
import {useParams} from "react-router";

export default function Preview(){
    const {id} = useParams()
    return(
        <div>
            {`Product # ${id}`}
        </div>
    )
}
