import React from 'react';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { API_URL } from 'config';

import { useRouter } from 'next/router';

interface IEvent {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image: {
    formats: {
      medium: {
        url: string;
        name: string;
      };
    };
  };
}

type IQuery = {
  term: string;
};

export const getServerSideProps: GetServerSideProps<{ events: IEvent[] }, IQuery> = async ({ query }) => {
  const res = await fetch(`${API_URL}/events?name_contains=${query.term}`);
  const items = await res.json();

  return {
    props: {
      events: items
    }
  };
};

const Events = ({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { query } = useRouter();

  return (
    <Layout title='Home'>
      <h1>Search result for: {query.term} </h1>

      {!events.length && <h1>No events yet</h1>}

      {events.map(item => (
        <EventItem key={item.id} event={item} />
      ))}
    </Layout>
  );
};
export default Events;
