import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { Post } from '../API';
import { convertDateToElapsed } from '../lib/formatDatePost';

interface Props {
  post: Post;
}

export const PostPreview: React.FC<Props> = ({ post }) => {
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction={'row'}
        justifyContent="flex-start"
        alignItems={'flex-start'}
        spacing={3}
        style={{ width: '100%', padding: 12, marginTop: 20 }}
      >
        <Grid item alignContent="center" style={{ maxWidth: 128 }}>
          <Grid container direction={'column'} alignItems="center">
            <Grid item>
              <IconButton color="info">
                <ArrowUpwardIcon style={{ maxWidth: 16 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid container alignItems={'center'} direction="column">
                <Grid item>
                  <Typography variant="h6">
                    {(post.upvote - post.downvote).toString()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">votes</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton color="info">
                <ArrowDownwardIcon style={{ maxWidth: 16 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={'column'} alignItems="flex-start">
            <Grid item>
              <Typography variant="body1">
                posted by <b>{post.owner}</b> at{' '}
                <b>{convertDateToElapsed(post.createdAt)} hours ago</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2">{post.title}</Typography>
            </Grid>
            <Grid item style={{ maxHeight: 90 }}>
              <Typography variant="body2">{post.content}</Typography>
            </Grid>
            {!post.image && (
              <Grid item>
                <Image
                  src="/vercel.svg"
                  height={300}
                  width={300}
                  layout="intrinsic"
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
