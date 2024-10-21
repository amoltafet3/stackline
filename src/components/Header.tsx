import React from 'react';
import logo from '../assets/images/stackline_logo.svg';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
        <img src={logo} alt="Stackline Logo" style={styles.logo} />
    </header>
  );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#003F7E',
        borderBottom: '1px solid #e9ecef',
    },
    logo: {
        height: '2rem',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
};

export default Header;
