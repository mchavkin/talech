import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useTranslation} from "react-i18next";
import TranslateIcon from "@material-ui/icons/Translate";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const languages = {
    en: 'English',
    lt: 'Lietuvių',
    ru: 'Русский'
}

export default function LanguageSelector() {
    const {i18n, t} = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = lng => {
        i18n.changeLanguage(lng)
            .then(t => {
                t(lng);
                handleClose();
            });
    }

    return (
        <div>
            <Button color="inherit"
                    startIcon={<TranslateIcon/>}
                    endIcon={<ArrowDropDownIcon/>}
                    onClick={handleClick}
                    data-testid="language-select"
            >
                {t('language')}
            </Button>
            <Menu
                id="language-selection"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                data-testid="language-menu"
            >
                {Object.entries(languages).map(([key, value]) =>
                    <MenuItem onClick={() => changeLanguage(key)} key={key}>
                        {value}
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}
