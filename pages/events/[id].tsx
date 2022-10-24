import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import styles from 'styles/Event.module.css';

import Layout from '@/components/Layout';
import { API_URL } from 'config';

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
      };
    };
  };
}

interface IProps {
  event: IEvent;
}

type IQuery = {
  id: string;
};

export const getStaticPaths: GetStaticPaths<IQuery> = async () => {
  const res = await fetch(`${API_URL}/events`);
  const items = await res.json();

  return {
    paths: (items || []).map((item: IEvent) => ({
      params: { id: String(item.id) }
    })),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<IProps, IQuery> = async ({ params }) => {
  const res = await fetch(`${API_URL}/events?id=${params?.id}`);
  const item = await res.json();

  return {
    props: {
      event: item?.[0]
    }
  };
};

const SingleEvent = ({ event }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const deleteEvent = () => {};

  return (
    <Layout title='Single event'>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href='#'>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {event.date} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image src={event.image.formats.medium.url} width={960} height={600} alt={event.name} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>
        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};
export default SingleEvent;
