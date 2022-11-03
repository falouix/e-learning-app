import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    large: {
      width: theme.spacing(13),
      height: theme.spacing(13),
    },
  }),
);

export default function ImageAvatars(id) {
  const classes = useStyles();
  console.log(id);
  let srcimg = "https://uism-tn.com/api/img/students/";
  const source = srcimg + id.id.id + ".jpg";
  console.log(source);
  if (id.id.class == "large") {
    return (
      <Avatar src={source} className={classes.large} />
    );
  } else {
    return (
      <Avatar alt={id.id.alt} src={source} className={classes.small} />
    );
  }
}
