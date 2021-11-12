import Head from "next/head"
import { Fragment } from "react";
import { MongoClient } from "mongodb";
    // www.our-domain.com
    import MeetupList from "../components/meetups/MeetupList"


    // const DUMMY_MEETUPS = [
    //     {
    //         id : "m1",
    //         title : "A first Meetup",
    //         image: "https://pix8.agoda.net/hotelImages/5779037/-1/d78c7594992ea3237c3c548647861e5c.jpg?s=1024x768" ,
    //         address:"MuhlWeg 7 , 65520 Roma",
    //         description:"This is first meetup!"
    //     },
    //     {
    //         id : "m2",
    //         title : "A second Meetup",
    //         image: "https://pix8.agoda.net/hotelImages/577/5779037/5779037_18090514410067843231.jpg?s=1024x768" ,
    //         address:"MuhlWeg 7 , 65520 Itali",
    //         description:"This is three meetup!"
    //     },
    //     {
    //         id : "m3",
    //         title : "A three Meetup",
    //         image: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/315860398.jpg?k=4b32a58011c1282ced6ffe7337456a6728d0e08106d77b4df3de08281932d650&o=" ,
    //         address:"MuhlWeg 7 , 65520 Romania",
    //         description:"This is three meetup!"
    //     }
    // ];
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
            revalidate: 10
        };
    }

export default HomePage;