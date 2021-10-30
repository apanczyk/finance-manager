import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/material";
import React from "react";
import Operation from "../../model/Operation";

export function useForm(initialFValues: Operation, validateOnChange = false, validate: any) {


    const [values, setValues] = React.useState(initialFValues);
    const [errors, setErrors] = React.useState({} as Operation);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({} as Operation)
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props: any) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}
