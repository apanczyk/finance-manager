import { Button, Checkbox, Dialog, DialogContent, DialogTitle, Grid, Input, RadioGroup, Select, Typography } from "@mui/material";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
// import { Form } from "formik";
// import { DatePicker } from "formik-mui-lab/dist/DatePicker";
import React from "react";

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

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

interface OperationFormProps {
    openPopup: boolean
    // setOpenPopup: any
    // recordForEdit: any
    // addOrEdit: any
}

export default function OperationForm(props: OperationFormProps) {

    const classes = useStyles();
    const { openPopup
        // , setOpenPopup, recordForEdit, addOrEdit 
    } = props;

    // const validate: any = (fieldValues = values) => {
    //     let temp = { ...errors }
    //     if ('fullName' in fieldValues)
    //         temp.fullName = fieldValues.fullName ? "" : "This field is required."
    //     if ('email' in fieldValues)
    //         temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    //     if ('mobile' in fieldValues)
    //         temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
    //     if ('departmentId' in fieldValues)
    //         temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
    //     setErrors({
    //         ...temp
    //     })

    //     if (fieldValues == values)
    //         return Object.values(temp).every(x => x == "")
    // }

    // const {
    //     values,
    //     setValues,
    //     errors,
    //     setErrors,
    //     handleInputChange,
    //     resetForm
    // } = useForm(initialFValues, true, validate);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // if (validate()) {
        // addOrEdit(new Operation, resetForm);
        // }
    }

    // React.useEffect(() => {
    //     console.log("")
    //     // if (recordForEdit != null)
    //     // setValues({
    //     //     ...recordForEdit
    //     // })
    // }, [recordForEdit])

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
                    // onClick={() => { setOpenPopup(false) }}
                    >
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <form>
                    {/* <Form onSubmit={handleSubmit}> */}
                    <Grid container>
                        <Grid item xs={6}>
                            <Input
                                name="fullName"
                            // label="Full Name"
                            // value={values.fullName}
                            // onChange={handleInputChange}
                            // error={errors.fullName}
                            />
                            <Input
                                // label="Email"
                                name="email"
                            // value={values.email}
                            // onChange={handleInputChange}
                            // error={errors.email}
                            />
                            <Input
                                // label="Mobile"
                                name="mobile"
                            // value={values.mobile}
                            // onChange={handleInputChange}
                            // error={errors.mobile}
                            />
                            <Input
                                // label="City"
                                name="city"
                            // value={values.city}
                            // onChange={handleInputChange}
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <RadioGroup
                                name="gender"
                            // label="Gender"
                            // value={values.gender}
                            // onChange={handleInputChange}
                            // items={genderItems}
                            />
                            <Select
                                name="departmentId"
                                label="Department"
                            // value={values.departmentId}
                            // onChange={handleInputChange}
                            // options={employeeService.getDepartmentCollection()}
                            // error={errors.departmentId}
                            />
                            {/* <KeyboardDatePicker 
                                name="hireDate"
                                label="Hire Date"
                                value={values.hireDate}
                                onChange={handleInputChange}
                            /> */}
                            <Checkbox
                                name="isPermanent"
                            // label="Permanent Employee"
                            // value={values.isPermanent}
                            // onChange={handleInputChange}
                            />

                            <div>
                                <Button
                                    type="submit"
                                >Submit</Button>
                                <Button
                                // onClick={resetForm} 
                                >
                                    Reset
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                    {/* </Form> */}
                </form>
            </DialogContent>
        </Dialog>
    )
}