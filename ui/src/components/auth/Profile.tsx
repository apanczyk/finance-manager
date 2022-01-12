import { Component } from "react";
import { Redirect } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import AuthService from "../../service/AuthService";
import IUser from "../../model/types/UserType";
import Container from "@material-ui/core/Container";
import { Box, Button, IconButton, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { parseJwt } from "../../util/AuthVerifier";
import { ChangePasswordDto } from "../../model/ChangePassword";
import DataService from "../../service/api/DataService";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { emptyChangePassword } from "../../util/Utils";
import * as Yup from "yup";
import EditIcon from '@mui/icons-material/Edit';

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string },
  message: string | undefined,
  modal: boolean
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
      message: undefined,
      modal: false
    };
  }

  validationSchema() {
    return Yup.object().shape({
      passwordFirst: Yup.string()
        .test(
          "len",
          "Password should be between 4 and 20 characters",
          (passwordInput: any) =>
            passwordInput &&
            passwordInput.toString().length >= 4 &&
            passwordInput.toString().length <= 20
        )
        .required("Field required"),
      passwordSecond: Yup.string()
        .test(
          "len",
          "Password should be between 4 and 20 characters",
          (passwordInput: any) =>
            passwordInput &&
            passwordInput.toString().length >= 4 &&
            passwordInput.toString().length <= 20
        )
        .required("Field required"),
    });
  }

  handlePasswordChange(formValue: { passwordFirst: string; passwordSecond: string }) {
    const { passwordFirst, passwordSecond } = formValue;

    if (passwordFirst !== passwordSecond) {
      this.setState({ message: "Passwords are not matching" })
    } else {
      const changePasswordDto: ChangePasswordDto = {
        id: this.state.currentUser?.id,
        password: passwordFirst
      }
      DataService.changePassword(changePasswordDto)
        .then(response => {
          this.setState({ message: undefined })
          this.setState({ modal: false })
        })
        .catch(error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({ message: resMessage })
        });
    }
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" })
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    const rows = [
      { key: 'Id:', value: `${currentUser.id}` },
      { key: 'Email:', value: `${currentUser.email}` },
      { key: 'Token:', value: `${currentUser.accessToken.substring(0, 20)} ... ${currentUser.accessToken.substr(currentUser.accessToken.length - 20)}` },
      { key: 'Authorities:', value: `${currentUser.role}` },
      { key: 'Token expiration:', value: `${new Date(parseJwt(currentUser.accessToken)?.exp * 1000).toLocaleString()}` },
    ]

    return (
      <div>
        {(this.state.userReady) ?
          <Container component="main" maxWidth="lg">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Profile
                <IconButton color="primary" size="large" onClick={() => this.setState({ modal: true })}>
                  <EditIcon />
                </IconButton>
              </Typography>
              <TableContainer component={Paper}>
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.key}>
                        <TableCell component="th" scope="row">
                          {row.key}
                        </TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Container>
          : null}

        <Dialog
          open={this.state.modal}
          maxWidth="md" >
          <DialogTitle>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                Change password
              </Typography>
              <Button
                color="secondary"
                onClick={() => {
                  this.setState({
                    message: undefined, modal: false
                  })

                }}
              ><CloseIcon />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <Formik
              initialValues={emptyChangePassword}
              validationSchema={this.validationSchema}
              onSubmit={passwordValues => this.handlePasswordChange(passwordValues)}
            >
              <Form>
                <Box sx={{ flexDirection: 'column', alignItems: 'center', m: 2 }}>
                  <Field component={TextField} name="passwordFirst" type="password" label="Password" disabled={false} variant="standard" fullWidth />
                  <Field component={TextField} name="passwordSecond" type="password" label="Confirm password" disabled={false} variant="standard" fullWidth />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 2 }}>
                  <Button variant='outlined' color='secondary' type='submit' fullWidth>
                    Submit
                  </Button>
                  {this.state.message && (
                    <Typography component="h2" variant="h6">{this.state.message}</Typography>
                  )}
                </Box>
              </Form>
            </Formik>
          </DialogContent >
        </Dialog >
      </div>
    );
  }
}
