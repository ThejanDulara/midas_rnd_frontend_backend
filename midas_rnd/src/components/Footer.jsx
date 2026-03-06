// components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Midas Media (PVT) LTD. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: '40px',
    padding: '12px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#8d8e92',
    borderTop: '1px solid #8d8e92',
    backgroundColor: '#f2f5f7'
  }
};

export default Footer;
