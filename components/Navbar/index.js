import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'sticky', // Change 'absolute' to 'sticky'
  top: 0,            // Ensure it sticks to the top of the viewport
  left: 0,
  zIndex: 1000,      // Ensure it stays above other content
  padding: '10px',   // Optional: Add padding for better spacing
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for better visibility
}));

const ListItem = styled('li')(() => ({
  display: 'inline-block',
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    <Navbar>
      <ul style={{ margin: 0, padding: 0 }}> {/* Reset margin and padding for the list */}
        <ListItem>
          <Link href={'/'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={'/users'}>Users</Link>
        </ListItem>
      </ul>
    </Navbar>
  );
};

export default TopNavbar;
