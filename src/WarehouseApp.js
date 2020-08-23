import React, {Suspense} from "react";
import LanguageBar from "./components/LanguageBar/LanguageBar";
import CircularProgress from "@material-ui/core/CircularProgress";


export default function WarehouseApp() {
    return (
            <Suspense fallback={<CircularProgress/>}>
                <LanguageBar/>
             </Suspense>
    )
}
