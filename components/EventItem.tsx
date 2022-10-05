import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/EventItem.module.css';

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

interface IProps {
  event: IEvent;
}

const EventItem: NextPage<IProps> = ({ event }) => (
  <div className={styles.event}>
    <div className={styles.img}>
      <Image src={event.image} alt={event.name} width={170} height={100} />
    </div>
    <div className={styles.info}>
      <span>
        {event.date} at {event.time}
      </span>
      <h3>{event.name}</h3>
    </div>
    <div className={styles.link}>
      <Link href={`/events/${event.slug}`}>Details</Link>
    </div>
  </div>
);

export default EventItem;
