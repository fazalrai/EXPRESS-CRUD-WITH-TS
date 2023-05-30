import {connect, connection } from 'mongoose';

const connectDb = async () => {

    connection.on('connecting', () => {
        console.log("Connecting to mongodb");
    })

    connection.on('connected', () => {
        console.log(`Mongo db connected at port ${process.env.MONGO_URI}`);
    })

   connection.on('error', err => {
        return err
        console.log("error after initial connection was established in the mongo db");
    })

    connection.on('disconnected', err => {
        console.log("mongo db disconnected");
    })

    try{
        await connect(process.env.MONGO_URI);
    } catch(error){

        console.log("connection to mongo db failed");
        console.log(error);
    }

}

export default connectDb;