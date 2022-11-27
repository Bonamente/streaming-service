/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './Navbar.module.css';
import magic from '../../lib/magic-client';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [didToken, setDidToken] = useState('');
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    const applyUsernameInNav = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        const idToken = await magic.user.getIdToken();

        if (email) {
          setUsername(email);
          setDidToken(idToken);
        }
      } catch (err) {
        console.error('Error retrieving email', err);
      }
    };

    applyUsernameInNav();
  }, []);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const ref = useOutsideClick(showDropdown, handleShowDropdown);

  const handleSignout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${didToken}`,
          'Content-Type': 'application/json',
        },
      });

      await response.json();
    } catch (err) {
      console.error('Error logging out', err);
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.linkWrapper}>
          <Link className={styles.logoLink} href="/">
            <a className={styles.link}>
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
        </div>

        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              <a
                className={cn(
                  styles.navLink,
                  currentRoute === '/'
                    ? styles.activeNavLink
                    : styles.nonActiveNavLink
                )}
              >
                Home
              </a>
            </Link>
          </li>
          <li className={styles.navItem2}>
            <Link href="/browse/my-list">
              <a
                className={cn(
                  styles.navLink,
                  currentRoute === '/browse/my-list'
                    ? styles.activeNavLink
                    : styles.nonActiveNavLink
                )}
              >
                My List
              </a>
            </Link>
          </li>
        </ul>

        <div className={styles.authContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={handleShowDropdown}
              type="button"
              ref={ref}
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
                  <button
                    className={styles.authLink}
                    onClick={handleSignout}
                    type="button"
                  >
                    Sign out
                  </button>

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
