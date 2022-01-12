import UserService from "../../service/UserService";
import EventBus from "../../util/EventBus";
import { TableCell, Paper, TableContainer, Table, TableHead, TableRow, TableBody, IconButton, Typography, Dialog, Box, DialogTitle, Button, DialogContent, Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DataService from "../../service/api/DataService";
import IUser from "../../model/types/UserType";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ChangePasswordDto } from "../../model/ChangePassword";
import { TextField } from "formik-mui";
import { emptyChangePassword } from "../../util/Utils";

export default function AdminBoard() {
  const [content, setContent] = React.useState<string>()
  const [values, setValues] = React.useState<IUser[]>([])
  const [modal, setModal] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<IUser>()
  const [message, setMessage] = React.useState<string>()

  React.useEffect(() => {
    UserService.getAdminBoard().then(
      response => {
        setContent(response.data);
      },
      error => {
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        );

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    DataService.getAllUsers()
      .then(response => {
        setValues(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteUser = (user: IUser) => {
    DataService.deleteUser(user.id)
      .then(response => {
        setValues(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  const modifyPassword = (user: IUser) => {
    setUser(user)
    setModal(true)
  }

  const validationSchema = () => {
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

  const handlePasswordChange = (formValue: { passwordFirst: string; passwordSecond: string }) => {
    const { passwordFirst, passwordSecond } = formValue;

    if (passwordFirst !== passwordSecond) {
      setMessage("Passwords are not matching")
    } else {
      const changePasswordDto: ChangePasswordDto = {
        id: user?.id,
        password: passwordFirst
      }
      DataService.changePassword(changePasswordDto)
        .then(response => {
          setValues(response.data)
          setMessage(undefined)
          setUser(undefined)
          setModal(false)
        })
        .catch(error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage)
        });
    }
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="right" >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((user) => (
                  <TableRow key={user?.id}>
                    <TableCell align="left">
                      {user.email}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="secondary" size="large" onClick={() => modifyPassword(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        disabled={user.role === 'ADMIN'}
                        color="secondary"
                        onClick={() => deleteUser(user)}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Dialog
        open={modal}
        maxWidth="md" >
        <DialogTitle>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Change password
            </Typography>
            <Button
              color="secondary"
              onClick={() => {
                setMessage(undefined)
                setUser(undefined)
                setModal(false)
              }}
            ><CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={emptyChangePassword}
            validationSchema={validationSchema}
            onSubmit={passwordValues => handlePasswordChange(passwordValues)}
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
                {message && (
                  <Typography component="h2" variant="h6">{message}</Typography>
                )}
              </Box>
            </Form>
          </Formik>
        </DialogContent >
      </Dialog >
    </div >

  );

}
