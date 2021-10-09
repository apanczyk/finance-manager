import { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

import AuthService from "../service/AuthService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography } from "@material-ui/core";
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
  loading: boolean,
  message: string
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
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
      message: "",
      loading: true
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
          loading: false,
          message: resMessage
        });
      }
    );
  }


  render() {
    const theme = createTheme();
    const { loading, message } = this.state;
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };

    const initialValues = {
      email: "",
      password: "",
    };
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="#">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );

    // return (
    //   <div className="col-md-12">
    //     <div className="card card-container">
    //       <img
    //         src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
    //         alt="profile-img"
    //         className="profile-img-card"
    //       />

    //       <Formik
    //         initialValues={initialValues}
    //         validationSchema={this.validationSchema}
    //         onSubmit={this.handleLogin}
    //       >
    //         <Form>
    //           <div className="form-group">
    //             <label htmlFor="email">Email</label>
    //             <Field name="email" type="text" className="form-control" />
    //             <ErrorMessage
    //               name="email"
    //               component="div"
    //               className="alert alert-danger"
    //             />
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="password">Password</label>
    //             <Field name="password" type="password" className="form-control" />
    //             <ErrorMessage
    //               name="password"
    //               component="div"
    //               className="alert alert-danger"
    //             />
    //           </div>

    //           <div className="form-group">
    //             <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
    //               {loading && (
    //                 <span className="spinner-border spinner-border-sm"></span>
    //               )}
    //               <span>Login</span>
    //             </button>
    //           </div>

    //           {message && (
    //             <div className="form-group">
    //               <div className="alert alert-danger" role="alert">
    //                 {message}
    //               </div>
    //             </div>
    //           )}
    //         </Form>
    //       </Formik>
    //     </div>
    //   </div>
    // );
  }
}