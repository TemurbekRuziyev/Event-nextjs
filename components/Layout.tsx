import React from 'react';
import Head from 'next/head';

import styles from '../styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import { useRouter } from 'next/router';

interface IProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children, title, description }) => {
  const { pathname } = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <Header />
      {pathname === '/' && <Showcase />}
      <div>{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
