import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '@/components/Layout';

const SingleEvent = () => {
  const { back, ...args } = useRouter();

  console.log(args);

  return (
    <Layout title='Single event'>
      Single Event
      <button onClick={() => back()}>Go Back</button>
      <Link href='/'>Hello</Link>
    </Layout>
  );
};

export default SingleEvent;
