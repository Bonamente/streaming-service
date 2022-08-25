/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import styles from './Navbar.module.css';
import magic from '../../lib/magic-client';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');

  const router = useRouter();

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      } catch (err) {
        console.log('Error retrieving email:', err);
      }
    }

    getUsername();
  }, []);

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      await magic.user.logout();
      router.push('/login');
    } catch (err) {
      console.error('Error logging out', err);
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <a>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/logo.png"
                width="140px"
                height="40px"
                alt="Logo"
              />
            </div>
          </a>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem2}>
            <Link href="/browse/my-list">My List</Link>
          </li>
        </ul>

        <div className={styles.authContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={handleShowDropdown}
              type="button"
            >
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                width="24px"
                height="24px"
                alt="Expand dropdown"
              />
            </button>

            {showDropdown && (
              <div className={styles.authDropdown}>
                <div>
                  <a className={styles.authLink} onClick={handleSignout}>
                    Sign out
                  </a>

                  <div className={styles.lineWrapper} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
