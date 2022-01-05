import React from 'react';
import { useFormikContext } from 'formik';
import { Button } from '@mui/material';

const ButtonWrapper = () => {
    const { submitForm } = useFormikContext();

    const handleSubmit = () => {
        submitForm();
    }

    return (
        <Button
            variant='contained'
            color='primary'
            fullWidth={true}
            onClick={handleSubmit}
        >
            Submit
        </Button>
    );
};

export default ButtonWrapper;