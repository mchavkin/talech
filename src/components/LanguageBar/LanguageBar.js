import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";
import LanguageSelector from "./components/LanguageSelector";

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
});

export default function LanguageBar() {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {t('title')}
                </Typography>
                <LanguageSelector/>
            </Toolbar>
        </AppBar>
    )
}
