/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './Navbar.module.css';

const Navbar = ({ username }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/static/logo.png"
              width="140px"
              height="40px"
              alt="Logo"
            />
          </div>
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
                  <Link href="/login">
                    <a className={styles.authLink}>Sign out</a>
                  </Link>
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
