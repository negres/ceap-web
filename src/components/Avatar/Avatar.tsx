import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const  CustomAvatar = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ width: 100, height: 100, marginRight: '30px' }} alt="Remy Sharp" src={imageUrl} />
    </Stack>
  );
};

export default CustomAvatar;
