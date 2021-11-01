import { Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import React, { Dispatch, SetStateAction } from "react";
import Operation from "../../model/Operation";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from 'formik-mui';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogWrapper: {
            padding: theme.spacing(2),
            position: 'absolute',
            top: theme.spacing(5)
        },
        dialogTitle: {
            paddingRight: '0px'
        },
    }),
);

const emptyOperation: Operation = {
    id: "",
    name: "",
    amount: 0,
    place: "",
    date: ""
}

interface OperationFormProps {
    openPopup: boolean
    setOpenPopup: Dispatch<SetStateAction<boolean>>
    recordForEdit: Operation
    editOrAddOperation: (operation: Operation) => void
}

export default function OperationForm(props: OperationFormProps) {
    const [values, setValues] = React.useState<Operation>(emptyOperation);
    const classes = useStyles();
    const { openPopup, setOpenPopup, recordForEdit, editOrAddOperation } = props;

    const handleSubmit = (formValue: { name: string; amount: number, place: string, date: string }) => {
        const { name, amount, place, date } = formValue;
        const data: Operation = {
            id: values.id,
            name: name,
            amount: amount,
            place: place,
            date: date
        };

        editOrAddOperation(data);
    }

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required("This field is required!"),
            amount: Yup.string().required("This field is required!"),
            place: Yup.string().required("This field is required!"),
            date: Yup.string().required("This field is required!")
        });
    }

    React.useEffect(() => {
        if (recordForEdit != null) {
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return (
        <Dialog
            open={openPopup}
            maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Operation form
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => { setOpenPopup(false); }}
                    >
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <Formik
                    initialValues={values}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container>
                            <Grid item xs={6}>
                                <Field component={TextField} name="name" type="text" label="name" variant="standard" fullWidth />
                                <Field component={TextField} name="amount" type="number" label="amount" variant="standard" fullWidth />
                                <Field component={TextField} name="place" type="text" label="place" variant="standard" fullWidth />
                                <Field component={TextField} name="date" type="text" label="date" variant="standard" fullWidth />
                            </Grid>
                        </Grid>

                        <div>
                            <Button type="submit">
                                Submit
                            </Button>
                            <Button type="reset">
                                Reset
                            </Button>
                        </div>

                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
