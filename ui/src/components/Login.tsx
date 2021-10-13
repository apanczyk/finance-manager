import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

import AuthService from "../service/AuthService";
import { Field, Form, Formik } from "formik";
import { TextField } from 'formik-material-ui';
import { Container, ThemeProvider, Typography } from "@material-ui/core";
import { createTheme } from '@mui/material/styles';
import { Avatar, Box, Button } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface RouterProps {
  history: string
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  email: string,
  password: string,
  message: string
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      email: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { email: string; password: string }) {
    const { email, password } = formValue;

    this.setState({
      message: ""
    });


    AuthService.login(email, password).then(
      () => {
        this.props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage
        });
      }
    );
  }


  render() {
    const theme = createTheme();
    const { message } = this.state;

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
              Sign in
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
              onSubmit={this.handleLogin}
            >
              <Form>
                <div>
                  <Field component={TextField} name="email" type="text" label="Email" disabled="" />
                </div>

                <div>
                  <Field component={TextField} name="password" type="password" label="Password" disabled="" />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1.5, mb: 1.5 }}
                >
                  Login
                </Button>

                {message && (
                  <Typography component="h2" variant="h6">{message}</Typography>
                )}

              </Form>
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}