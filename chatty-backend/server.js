import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()

// app Config
const app = express();
const db_uname = process.env.MONGO_USER_NAME
const db_password = process.env.MONGO_DB_PASSWORD
const db_name = process.env.MONGO_DB_NAME
const port = process.env.PORT

var pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
    // encrypted: true // Depricated
  });

// Middleware
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

// DBConfig
const mongoConnectionURL =`mongodb+srv://${db_uname}:${db_password}@cluster0.hyahh.gcp.mongodb.net/${db_name}?retryWrites=true&w=majority`
mongoose.connect(mongoConnectionURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () => {
    console.log('DB Connected')

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log("new message received ", change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received
                }
            );
        } else {
            console.log("Error triggered at pusher");
        }

    });
})

// appRoutes
app.get('/', (req, res) =>
    res.status(200).send("Holla!!")
);

app.post('/app/v1/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

app.get('/app/v1/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// listen
app.listen(port, ()=> console.log(`Listning at port localhost:${port}`));