import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList"

function HomePage(props) {


    return (
        <Fragment>
                <Head>
                    <title>React Meetups</title>
                    <meta
                    name= "description"
                    content = "Browse a huge list of highly active React meetups!"
                    >
                    </meta>
                </Head>
                <MeetupList meetups = {props.meetups} />
        </Fragment>
    )
    
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     //fetch data from an API
//     return{
//         props: {
//             meetups:DUMMY_MEETUPS
//         }
//     };
// };

export async function getStaticProps() {
     // fetch data from an API
        const client = await  MongoClient.connect("mongodb+srv://gaby:14101997Pescar@cluster0.sqq1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        const db = client.db();
        
        const meetupsCollection = db.collection('meetups');
        
        const meetups = await meetupsCollection.find().toArray();

        client.close();
        return{
            props : {
                meetups: meetups.map(meetups =>({
                    title:meetups.title,
                    address: meetups.address,
                    image: meetups.image,
                    id: meetups._id.toString()
                }))
            },
            revalidate: 1
        };
    }

export default HomePage;
