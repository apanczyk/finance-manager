import { Button, Dialog, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import React, { Dispatch, SetStateAction } from "react";
import Operation from "../../model/Operation";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from 'formik-mui';
import TextFieldMui from '@mui/material/TextField';
import Category from "../../model/Category";
import DataService from "../../api/DataService";


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
    date: "",
    category: "",
    walletId: 0
}

interface OperationFormProps {
    openPopup: boolean
    setOpenPopup: Dispatch<SetStateAction<boolean>>
    recordForEdit: Operation
    editOrAddOperation: (operation: Operation) => void
}

const categoryTypes = [
    {
        key: 'INCOME',
        value: 'Income',
    },
    {
        key: 'OUTCOME',
        value: 'Outcome',
    },
];

export default function OperationForm(props: OperationFormProps) {
    const [values, setValues] = React.useState<Operation>(emptyOperation);
    const classes = useStyles();
    const { openPopup, setOpenPopup, recordForEdit, editOrAddOperation } = props;
    const [categoryType, setCategoryType] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [categories, setCategories] = React.useState(Array<Category>());

    const handleChangeCategoryType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryType(event.target.value);
        DataService.getCategories(event.target.value)
            .then(response => {
                setCategories(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    };

    const handleSubmit = (formValue: { name: string; amount: number, place: string, date: string, category: string, walletId: number }) => {
        const { name, amount, place, date, walletId } = formValue;
        const data: Operation = {
            id: values.id,
            name: name,
            amount: amount,
            place: place,
            date: date,
            category: category,
            walletId: walletId
        };

        editOrAddOperation(data);
    }

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required("Field required"),
            amount: Yup.string().required("Field required"),
            place: Yup.string().required("Field required"),
            date: Yup.string().required("Field required")
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
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Field component={TextField} name="name" type="text" label="name" variant="standard" fullWidth />
                                <Field component={TextField} name="amount" type="number" label="amount" variant="standard" fullWidth />
                                <Field component={TextField} name="place" type="text" label="place" variant="standard" fullWidth />
                                <Field component={TextField} name="date" type="text" label="date" variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldMui
                                    id="categoryType"
                                    select
                                    label="Category Type"
                                    value={categoryType}
                                    onChange={handleChangeCategoryType}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    variant="standard"
                                    fullWidth
                                >
                                    {categoryTypes.map((specCategoryType) => (
                                        <option key={specCategoryType.key} value={specCategoryType.key}>
                                            {specCategoryType.value}
                                        </option>
                                    ))}
                                </TextFieldMui>

                                <TextFieldMui
                                    id="category"
                                    select
                                    label="Category"
                                    value={category}
                                    onChange={handleChangeCategory}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    variant="standard"
                                    fullWidth
                                >
                                    {categories.map((specCategory) => (
                                        <option key={specCategory.id} value={specCategory.id}>
                                            {specCategory.name}
                                        </option>
                                    ))}
                                </TextFieldMui>
                            </Grid>
                        </Grid>
                        <div>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Button variant="outlined" color='secondary' type="submit">
                                    Submit
                                </Button>
                                <Button variant="outlined" color='secondary' type="reset">
                                    Reset
                                </Button>
                            </Stack>
                        </div>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
