import * as express from 'express';
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public routes: Routes = new Routes();
    public mongoUrl: string = 'mongodb://dbUser:12345678@localhost:27017/todo';

    constructor() {
        this.app = express();
        this.config();        
        this.routes.routes(this.app);     
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });        
    }

}

export default new App().app;