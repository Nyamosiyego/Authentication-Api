import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const mongo_URL = 'mongodb+srv://omwegaedmond:edmond@cluster0.310ljzb.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise
mongoose.connect(mongo_URL)

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
})
mongoose.connection.on('error', (error: Error) => {
    console.log('MongoDB connection error: ' + error)
    process.exit(-1)
})


app.use('/', router())