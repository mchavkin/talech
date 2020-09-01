import React, {Suspense} from "react";
import LanguageBar from "./components/LanguageBar/LanguageBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import List from "./components/pages/List/List";
import Preview from "./components/pages/Preview/Preview";
import New from "./components/pages/NewProduct/NewProduct";
import EditProduct from "./components/pages/EditProduct/EditProduct";

export default function WarehouseApp() {
    return (
        <Router basename="/products">
            <Suspense fallback={<CircularProgress/>}>
                <LanguageBar/>
                <Switch>
                    <Route exact path='/' component={List}/>
                    <Route exact path='/create' component={New}/>
                    <Route exact path='/:id/edit' component={EditProduct}/>
                    <Route exact path='/:id' component={Preview}/>
                </Switch>
            </Suspense>
        </Router>
    )
}
