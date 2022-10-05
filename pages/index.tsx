import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '@/components/Layout';
import { API_URL } from 'config';
import EventItem from '@/components/EventItem';

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
  image: string;
}

export const getStaticProps: GetStaticProps<{ events: IEvent[] }> = async () => {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  return {
    props: {
      events
    }
  };
};

const Home = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title='Home'>
    <h1>Events </h1>
    {!events.length && <h1>No events yet</h1>}

    {events.map(item => (
      <EventItem key={item.id} event={item} />
    ))}
  </Layout>
);

export default Home;
