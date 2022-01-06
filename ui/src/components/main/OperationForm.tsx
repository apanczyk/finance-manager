import { Dialog, DialogTitle, Typography, Button, DialogContent, Grid, MenuItem, Stack } from "@mui/material";
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
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { format, formatISO, isValid } from "date-fns";

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
    date: format(new Date(), "yyyy/MM/dd"),
    category: {
        id: 0,
        name: '',
        type: ''
    } as Category,
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
        key: 'COST',
        value: 'Cost',
    },
];

export default function OperationForm(props: OperationFormProps) {
    const [values, setValues] = React.useState<Operation>(emptyOperation);
    const classes = useStyles();
    const { openPopup, setOpenPopup, recordForEdit, editOrAddOperation } = props;
    const [categoryType, setCategoryType] = React.useState('INCOME');
    const [categories, setCategories] = React.useState(Array<Category>());
    const [allCategories, setAllCategories] = React.useState(Array<Category>());

    const handleChangeCategoryType = (event: React.ChangeEvent<HTMLInputElement>) => {
        let copyValues = { ...values }
        copyValues.category = emptyOperation.category
        setValues(copyValues)

        let filteredCategories = allCategories.filter(cat => cat.type !== categoryType)
        setCategories(filteredCategories)
        setCategoryType(event.target.value);
    };

    const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        let categoryId = Number(Object.keys(categories).find((k: any) => categories[k].name === event.target.value))
        let copyValues = { ...values }
        copyValues.category = categories[categoryId]
        setValues(copyValues)
    };

    const handleChangeDate = (newValue: string | null) => {
        if(isValid(newValue)){
            let copyValues = { ...values }
            copyValues.date = newValue!
            setValues(copyValues)    
        }
    };

    const handleSubmit = (formValue: { name: string; amount: number, place: string, walletId: number }) => {
        const { name, amount, place, walletId } = formValue;
        const data: Operation = {
            id: values.id,
            name: name,
            amount: amount,
            place: place,
            date: formatISO(new Date(values.date),  { representation: 'date' }),
            category: values.category,
            walletId: walletId
        };

        editOrAddOperation(data);
    }

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required("Field required"),
            amount: Yup.string().required("Field required"),
            place: Yup.string().required("Field required")
        });
    }

    React.useEffect(() => {
        if (recordForEdit != null) {
            setValues({
                ...recordForEdit
            })
            DataService.getCategoriesAll()
                .then(response => {
                    setAllCategories(response.data)
                    setCategories(response.data)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [recordForEdit])


    React.useEffect(() => {
        DataService.getCategoriesAll()
            .then(response => {
                setAllCategories(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }, [openPopup])

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
                    onSubmit={valuesInForm => handleSubmit(valuesInForm)}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Field component={TextField} name="name" type="text" label="name" variant="standard" fullWidth />
                                <Field component={TextField} name="amount" type="number" label="amount" variant="standard" fullWidth />
                                <Field component={TextField} name="place" type="text" label="place" variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldMui
                                    id="categoryType"
                                    select
                                    label="Category Type"
                                    value={categoryType}
                                    onChange={handleChangeCategoryType}
                                    variant="standard"
                                    fullWidth
                                >
                                    {categoryTypes.map((specCategoryType) => (
                                        <MenuItem key={specCategoryType.key} value={specCategoryType.key}>
                                            {specCategoryType.value}
                                        </MenuItem>
                                    ))}
                                </TextFieldMui>

                                <TextFieldMui
                                    id="categorySpec"
                                    select
                                    required
                                    label="Category"
                                    value={values.category.name}
                                    onChange={handleChangeCategory}
                                    variant="standard"
                                    fullWidth
                                >
                                    {
                                        categories.map((specCategory) => (
                                            <MenuItem key={specCategory.name} value={specCategory.name}>
                                                {specCategory.name}
                                            </MenuItem>
                                        ))
                                    }

                                </TextFieldMui>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="yyyy/MM/dd"
                                        value={values.date}
                                        onChange={handleChangeDate}
                                        mask="____/__/__"
                                        renderInput={(params) => <TextFieldMui {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button variant='outlined' color='secondary' type='submit' fullWidth>
                                Submit
                            </Button>
                            <Button variant='outlined' color='secondary' type='reset' fullWidth>
                                Reset
                            </Button>
                        </Stack>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
