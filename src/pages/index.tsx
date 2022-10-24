import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useUser } from '../context/AuthContext';

const Home: NextPage = () => {
  const { user } = useUser();
  console.log('user: ', user);

  return <Typography variant="h1"> hello world</Typography>;
};

export default Home;
