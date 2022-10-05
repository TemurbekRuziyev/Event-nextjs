import React from 'react';
import Head from 'next/head';

import styles from '../styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';

interface IProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children, title, description }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
