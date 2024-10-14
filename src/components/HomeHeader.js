import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(45deg, #3a0ca3 30%, #4cc9f0 90%);
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;
`;

function HomeHeader() {
  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BorrowBank AI
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default HomeHeader;
