import type { GetStaticProps, InferGetStaticPropsType } from 'next';
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

const Home = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(events[0]);

  return <Layout title='Home'>Upcoming Events</Layout>;
};

export default Home;
