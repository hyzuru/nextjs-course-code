import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail'

function MeetupDetails(props) {
  return (
    <MeetupDetail 
    image={props.meetupData.image}
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description}
    />

  )
}


export async function getStaticPaths() {

  const client = await MongoClient.connect('mongodb+srv://mainuser:05xtMAKMOOpakuTj@cluster0.ks0oy0c.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close(); 

  return {
    fallback: false,
    paths: meetups.map( (meetup) => ({ 
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// this run is only run during build time and not on the client
export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://mainuser:05xtMAKMOOpakuTj@cluster0.ks0oy0c.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

  console.log(selectedMeetup)

  client.close(); 

  return {
    props: {
      // meetupData: selectedMeetup
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    }
  }

}

export default MeetupDetails;