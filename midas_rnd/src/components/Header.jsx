import React from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const initials = user ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() : "";

  return (
    <header style={styles.header}>
      {/* Left: Tagline */}
      <div style={styles.left}>
        <span style={styles.tagline}>Where Intelligence Shapes Smarter Media Planning.</span>
      </div>

      {/* Center: Logo + Company Name */}
      <div style={styles.center}>
        <img src="/company-logo_m.png" alt="MTM Logo" style={styles.logo} />
        <h1 style={styles.title}>Midas Media (PVT) LTD</h1>
      </div>

      {/* Right: App context / User */}
      <div style={styles.right}>
        {!user ? (
          <>
            <span style={styles.environment}>Midas Media AI Research Hub</span>
            <Link to="/signin" style={styles.signinBtn}>Sign In</Link>
          </>
        ) : (
          <div style={styles.userSection}>
            <span style={styles.environment}>Hi, {user.first_name}</span>
            <div style={styles.avatarWrap} onClick={() => setOpen(v => !v)}>
            {user.profile_pic ? (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL || "https://midasrndfrontendbackend-production.up.railway.app"}${user.profile_pic}`}
                alt="profile"
                style={styles.avatarImg}
              />
            ) : (
              <div style={styles.avatarFallback}>{initials || "U"}</div>
            )}
            </div>
            {open && (
              <div style={styles.menu}>
                <button
                  style={styles.menuItem}
                  onClick={() => { setOpen(false); navigate('/dashboard'); }}
                >
                  Dashboard
                </button>

                <div style={styles.menuDivider}></div>

                <button
                  style={styles.menuItem}
                  onClick={() => { setOpen(false); navigate('/profile'); }}
                >
                  Profile
                </button>

                {Boolean(user.is_admin) && (
                  <>
                    <div style={styles.menuDivider}></div>
                    <button
                      style={styles.menuItem}
                      onClick={() => { setOpen(false); navigate('/admin'); }}
                    >
                      Admin Page
                    </button>
                  </>
                )}

                <div style={styles.menuDivider}></div>

                <button
                  style={styles.menuItem}
                  onClick={async () => { await signout(); navigate('/signin'); }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#f2f5f7',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #8d8e92',
    position: 'relative',
    minHeight: '60px',
  },
  left: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    minWidth: 0, // Allow text truncation
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    flexShrink: 0,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    color: '#8d8e92',
    minWidth: 0, // Allow content to shrink if needed
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    position: 'relative'
  },
  logo: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain'
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e1e25',
    margin: 0,
    whiteSpace: 'nowrap'
  },
  tagline: {
    fontSize: '14px',
    color: '#8d8e92',
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  environment: {
    backgroundColor: '#f2f5f7',
    padding: '6px 12px',
    borderRadius: '20px',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  signinBtn: {
    background: '#8b7c56',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: 8,
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  },
  avatarWrap: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '1px solid #8d8e92',
    flexShrink: 0
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f2f5f7',
    color: '#8b7c56',
    fontWeight: 700
  },
  menu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    background: '#fff',
    border: '1px solid #8d8e92',
    borderRadius: 8,
    minWidth: 160,
    boxShadow: '0 10px 30px rgba(0,0,0,.08)',
    zIndex: 10,
    marginTop: '8px'
  },
    menuItem: {
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "10px 12px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      color: "#1e1e25",
      lineHeight: "1.2",
    },
    menuDivider: {
      height: 1,
      backgroundColor: "#8d8e92",
      margin: "4px 0",
    }
};

export default Header;