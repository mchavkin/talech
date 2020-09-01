import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import useTranslation from "../../utils/useTranslation";
import LanguageSelector from "./components/LanguageSelector";
import {useHistory} from "react-router";

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
});

export default function LanguageBar() {
    const classes = useStyles();
    const {t} = useTranslation();
    const history = useHistory();
    const navigateToHome = () => history.push('/')

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6"
                            className={classes.title}
                            onClick={navigateToHome}
                >
                    {t('title')}
                </Typography>
                <LanguageSelector/>
            </Toolbar>
        </AppBar>
    )
}
