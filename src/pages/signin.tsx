import { Alert, Button, Grid, Snackbar, TextField } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
  username: string;
  password: string;
}

const SignIp = () => {
  const [open, setOpen] = useState(false);
  const [signinError, setSigninError] = useState('');
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log('submitted the form: ');
    console.log(data);
    // console.log('success sign in a user, ', amplifyUser);
    try {
      await Auth.signIn(data.username, data.password);
      router.push('/');
    } catch (err: any) {
      setSigninError(err.message);
    }
  };

  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
            Sign In
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClick={handleClose}>
          {signinError}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default SignIp;
