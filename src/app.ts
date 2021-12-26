import "reflect-metadata";
import * as dotenv from "dotenv"
import cors from "cors";
import Express from "express";
import routes from './routes'
import { createConnection } from "typeorm";
import ormconfig from './ormconfig';
dotenv.config();

const server = async () => {
    
    await createConnection(ormconfig)
        .then((con) => {
            console.log('Connected to DDBB');
        })
        .catch((e) => {
            console.log('Connection DDBB ERROR');
            console.log(e);
        })

    const app = Express();

    // Middlewares
    app.use(cors());
    app.use(Express.json());

    // Routes
    app.use('/api', routes);

    // Start Server
    const PORT = process.env["PORT"] || 4000;
    app.listen(PORT, () => {
        console.log(`API running on [PORT: ${PORT}]`);      
    })
}

server().catch(e => console.log(e))