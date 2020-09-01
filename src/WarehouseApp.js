import React, {Suspense} from "react";
import LanguageBar from "./components/LanguageBar/LanguageBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import List from "./components/pages/List/List";
import Preview from "./components/pages/Preview/Preview";
import New from "./components/pages/NewProduct/NewProduct";
import EditProduct from "./components/pages/EditProduct/EditProduct";
import Loading from "./components/Loading/Loading";
import MessageDisplay from "./components/MessageDisplay/MessageDisplay";

export default function WarehouseApp() {
    return (
        <Suspense fallback={<CircularProgress/>}>
                <Loading />
                <MessageDisplay/>
                <Router basename="/products">
                    <LanguageBar/>
                    <Switch>
                        <Route exact path='/' component={List}/>
                        <Route exact path='/create' component={New}/>
                        <Route exact path='/:id/edit' component={EditProduct}/>
                        <Route exact path='/:id' component={Preview}/>
                    </Switch>
                </Router>
        </Suspense>
    )
}
