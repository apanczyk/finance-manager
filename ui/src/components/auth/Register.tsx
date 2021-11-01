import { Component } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { Container, ThemeProvider, Typography } from "@material-ui/core";
import AuthService from "../../service/AuthService";
import { TextField } from 'formik-mui';
import { createTheme } from '@mui/material/styles';
import { Avatar, Box, Button } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


type Props = {};

type State = {
  email: string,
  password: string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  handleRegister(formValue: { email: string; password: string }) {
    const { email, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      email,
      password
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const theme = createTheme();
    const { successful, message } = this.state;

    const initialValues = {
      email: "",
      password: "",
    };

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register in
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
              onSubmit={this.handleRegister}
            >
              <Form>
                {!successful && (
                  <div>
                    <div>
                      <Field component={TextField} name="email" type="text" label="Email" disabled={false} variant="standard" fullWidth />
                    </div>

                    <div>
                      <Field component={TextField} name="password" type="password" label="Password" variant="standard" disabled={false} fullWidth />
                    </div>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1.5, mb: 1.5 }}
                    >
                      Register in
                    </Button>
                    {message && (
                      <Typography component="h2" variant="h6">{message}</Typography>
                    )}
                  </div>
                )}
                {successful && (
                  <Typography component="h2" variant="h6">{"User registered"}</Typography>
                )}
              </Form>
            </Formik>
          </Box>
        </Container>
      </ThemeProvider >
    );
  }
}
