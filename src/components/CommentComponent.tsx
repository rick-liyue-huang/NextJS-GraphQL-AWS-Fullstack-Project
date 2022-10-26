import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { Comment } from '../API';
import { convertDateToElapsed } from '../lib/formatDatePost';

interface Props {
  comment: Comment | null;
}

export const CommentComponent: React.FC<Props> = ({ comment }) => {
  return (
    <Paper style={{ width: '100%', minHeight: 128, padding: 8 }}>
      {comment?.content}
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="body1">
            {comment?.owner} -{' '}
            {convertDateToElapsed(comment?.createdAt as string)} hours ago
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{comment?.content}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
