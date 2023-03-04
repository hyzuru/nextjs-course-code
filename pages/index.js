import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 5, Some city',
//     description: 'This is a first meetup!'
//   },
//   {
//     id: 'm2',
//     title: 'A First Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 10, Some city',
//     description: 'This is a second meetup!'
//   }
// ]

function HomePage(props) { 
  return <MeetupList meetups={props.meetups} />
}

// generated for every incoming request on server
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: { 
//       meetups: DUMMY_MEETUPS
//     },
//   }
// }

// pregenerate html file / cached and reused
export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://mainuser:05xtMAKMOOpakuTj@cluster0.ks0oy0c.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  
  // fetch data from an API
  return {
    props: { 
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1
  };
}

export default HomePage;