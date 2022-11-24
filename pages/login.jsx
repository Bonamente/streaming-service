/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Login.module.css';
import magic from '../lib/magic-client';

const emailValidationRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const handleOnEmailInput = ({ target: { value } }) => {
    setUserMessage('');
    setEmail(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (e.key === 'Enter' || e.type === 'click') {
      if (emailValidationRegExp.test(email)) {
        try {
          setIsLoading(true);

          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });

          if (didToken) {
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${didToken}`,
                'Content-Type': 'application/json',
              },
            });

            const loggedInResponse = await response.json();

            if (loggedInResponse.done) {
              router.push('/');
            } else {
              setIsLoading(false);
              setUserMessage('Something went wrong logging in');
            }
          }
        } catch (err) {
          console.error('Something went wrong logging in', err);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setUserMessage('Enter a valid email address');
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Paradiso SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
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
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinTitle}>Sign In</h1>

          <input
            className={styles.emailInput}
            placeholder="Email address"
            onChange={handleOnEmailInput}
            onKeyPress={handleLogin}
            type="text"
          />
          <p className={styles.userMessage}>{userMessage}</p>

          <button
            className={styles.loginBtn}
            onClick={handleLogin}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
