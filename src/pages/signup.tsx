import { Alert, Button, Grid, Snackbar, TextField } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '../context/AuthContext';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [signupError, setSignupError] = useState('');
  const { user, setUser } = useUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('submitted the form: ');

    console.log(data);

    try {
      signUpWithEmailAndPassword(data);
    } catch (err: any) {
      console.log(err);
      setOpen(true);
      setSignupError(err?.message);
    }
  };

  const handleClose = (event?: any) => {
    setOpen(false);
  };

  console.log('errors: ', errors);

  async function signUpWithEmailAndPassword(data: IFormInput) {
    const { username, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log('sign up with user: ', user);
    } catch (err) {
      throw err;
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      style={{ marginTop: 16 }}
    >
      <Grid
        container
        direction={'column'}
        alignItems="center"
        justifyContent={'center'}
        spacing={1}
      >
        <Grid item>
          <TextField
            id="username"
            variant="outlined"
            label="Username"
            type="text"
            error={errors.username?.message ? true : false}
            helperText={errors.username ? errors.username.message : null}
            {...register('username', {
              required: { value: true, message: 'please enter a username' },
              minLength: {
                value: 3,
                message: 'please enter a username with min 3 characters',
              },
              maxLength: {
                value: 16,
                message: 'please enter a username with min 3 characters',
              },
            })}
          />
        </Grid>

        <Grid item>
          <TextField
            id="email"
            variant="outlined"
            label="Email"
            type="email"
            error={errors.email?.message ? true : false}
            helperText={errors.email ? errors.email.message : null}
            {...register('email', {
              required: { value: true, message: 'please enter a email' },
            })}
          />
        </Grid>

        <Grid item>
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            type="password"
            error={errors.password?.message ? true : false}
            helperText={errors.password ? errors.password.message : null}
            {...register('password', {
              required: { value: true, message: 'please enter a password' },
              minLength: {
                value: 3,
                message: 'please enter a username with min 6 characters',
              },
            })}
          />
        </Grid>

        <Grid marginTop={'16px'}>
          <Button variant="contained" type="submit">
            Sign up
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClick={handleClose}>
          {signupError}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default SignUp;
