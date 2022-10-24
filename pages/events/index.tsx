import React from 'react';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { API_URL } from '../../config';

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

export const getStaticProps: GetStaticProps<{ events: IEvent[] }> = async () => {
  const res = await fetch(`${API_URL}/events`);
  const items = await res.json();

  return {
    props: {
      events: items
    }
  };
};

const Events = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title='Home'>
    <h1>Events </h1>
    {!events.length && <h1>No events yet</h1>}

    {events.map(item => (
      <EventItem key={item.id} event={item} />
    ))}
  </Layout>
);

export default Events;
