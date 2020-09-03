import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useTranslation from "../../utils/useTranslation";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers';
import {productValidationSchema} from "../../utils/validationSchema";
import {useHistory} from "react-router";

import {
    Button,
    TextField,
    InputAdornment,
    MenuItem,
    Checkbox,
    ListItemText,
    ListItemIcon,
    Chip
} from "@material-ui/core";

import StopIcon from '@material-ui/icons/Stop';
import {colors} from "../../resources/colors";
import {useDispatch} from "react-redux";
import {loading} from "../../redux/actions";

const useStyles = makeStyles(theme => ({
        container: {
            display: "flex",
            justifyContent: "center",
            margin: theme.spacing(2),
        },
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
            maxWidth: 450
        },
        checkbox: {
            margin: theme.spacing(1),
            width: 200,
            border: theme.border
        },
        buttons: {
            display: "flex",
            justifyContent: "center",
            margin: theme.spacing(2),
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
    })
);


export default function AddEditProduct({onSubmit, initialInputs}) {
    const classes = useStyles()
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(productValidationSchema),
        reValidateMode: "onBlur"
    });
    const history = useHistory();


    const [inputs, setInputs] = useState(initialInputs);

    const handleInputChange = field => evt => {
        setInputs({...inputs, [field]: evt.target.value});
    }
    const submitInputs = () => onSubmit(inputs);

    const backToList = () => {
        dispatch(loading());
        history.push('/');
    }

    return (
        <div className={classes.container}>
            <form className={classes.root} autoComplete="off" noValidate onSubmit={handleSubmit(submitInputs)}>
                <TextField
                    name={'name'}
                    value={inputs['name']}
                    label={t(`field.name`)}
                    onChange={handleInputChange('name')}
                    required
                    error={!!errors.name}
                    helperText={errors.name && t(errors.name.message)}
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                />
                <TextField
                    name={'ean'}
                    value={inputs['ean']}
                    label={t(`field.ean`)}
                    onChange={handleInputChange('ean')}
                    required
                    error={!!errors.ean}
                    helperText={errors.ean && t(errors.ean.message)}
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                />
                <TextField
                    name={'type'}
                    value={inputs['type']}
                    label={t(`field.type`)}
                    onChange={handleInputChange('type')}
                    required
                    error={!!errors.type}
                    helperText={errors.type && t(errors.type.message)}
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                />
                <TextField
                    name={'weight'}
                    value={inputs['weight']}
                    label={t(`field.weight`)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    onChange={handleInputChange('weight')}
                    error={!!errors.weight}
                    helperText={errors.weight && t(errors.weight.message)}
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                />
                <TextField
                    name={'color'}
                    select
                    SelectProps={{
                        multiple: true,
                        renderValue: (selected) => (
                            <div className={classes.chips}>
                                {selected.map((colorOption) => (
                                    <Chip key={colorOption} label={t(`colors.${colorOption}`)} className={classes.chip}/>
                                ))}
                            </div>)
                    }}
                    value={inputs.color}
                    label={t(`field.color`)}
                    onChange={handleInputChange('color')}
                    variant="outlined"
                    color="primary"
                >
                    {colors.map(colorOption => (
                            <MenuItem key={colorOption} value={colorOption}>
                                <Checkbox checked={inputs.color.includes(colorOption)} color='primary'/>
                                <ListItemIcon>
                                    <StopIcon style={{color: colorOption}}/>
                                </ListItemIcon>
                                <ListItemText primary={t(`colors.${colorOption}`)}/>
                            </MenuItem>
                        )
                    )}
                </TextField>
                <TextField
                    select
                    name={'active'}
                    value={inputs['active']}
                    label={t('field.active')}
                    onChange={handleInputChange('active')}
                    variant="outlined"
                    color="primary"
                >
                    <MenuItem value={true}>
                        {t('yes')}
                    </MenuItem>
                    <MenuItem value={false}>
                        {t('no')}
                    </MenuItem>
                </TextField>
                <TextField
                    name={'quantity'}
                    value={inputs['quantity']}
                    label={t(`field.quantity`)}
                    onChange={handleInputChange('quantity')}
                    required
                    error={!!errors.quantity}
                    helperText={errors.quantity && t(errors.quantity.message)}
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                />
                <TextField
                    name={'price'}
                    value={inputs['price']}
                    label={t(`field.price`)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}

                    onChange={handleInputChange('price')}
                    required
                    error={!!errors['price']}
                    helperText={errors.price && t(errors.price.message)}
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                />

                <div className={classes.buttons}>
                    <Button type="submit" variant="contained" color="primary">{t('buttons.save')}</Button>
                    <Button variant="outlined" color="primary"
                            onClick={backToList}>{t('buttons.list')}</Button>
                </div>
            </form>
        </div>
    )
}
