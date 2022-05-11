import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import _route from './_routes/index.route';
import cors from 'cors';
import mongoose, { ConnectOptions } from "mongoose";
dotenv.config();
const app: Express = express();
const port = process.env.PORT;
const allowedOrigins = ['http://localhost:4200'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', express.static('_uploads'))

app.use('/api',_route);


mongoose.connect(`${process.env.DB_URI}${process.env.DB_NAME}`,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true 
} as ConnectOptions).then((res)=>{
  console.log("Connnected With Database......");
}).catch((error)=>{
  console.log(error);
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
