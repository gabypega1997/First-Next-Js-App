// our-domain.com/[meetupId]
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import {MongoClient, ObjectId} from "mongodb";
import Head from "next/head";

function MeetupDetails (props) {
return (
    <Fragment>
        <Head>
                    <title>{props.meetupData.title}</title>
                    <meta
                    name= "description"
                    content = {props.meetupData.description}
                    >
                     </meta>
        </Head>
        <MeetupDetail 
        image = {props.meetupData.image}
        title = {props.meetupData.title}
        address = {props.meetupData.address}
        description = {props.meetupData.description}
        />
    </Fragment>



);
} 

export async function getStaticPaths() {

    const client = await  MongoClient.connect("mongodb+srv://gaby:14101997Pescar@cluster0.sqq1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        const db = client.db();
        
        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find({},{ _id : 1}).toArray();

        client.close();
        

    return {
        fallback:"blocking",
        paths: meetups.map(meetup =>({params:{meetupId: meetup._id.toString()}}))
        
    }
}

export async function getStaticProps(contex){
    // fetch data for a single meetup
    const meetupId = contex.params.meetupId;

    const client = await  MongoClient.connect("mongodb+srv://gaby:14101997Pescar@cluster0.sqq1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    const db = client.db();
    
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

    client.close();
    
    console.log(selectedMeetup)

    return {
        props:{ 
            meetupData: {
                id:selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }


}

export default MeetupDetails;