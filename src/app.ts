import "reflect-metadata";
import cors from "cors";
import Express from "express";

const server = async () => {
    const app = Express();
    app.use(cors());
    app.use(Express.json());

    const PORT = process.env["PORT"] || 4000;
    app.listen(PORT, () => {
        console.log(`API running on [PORT: ${PORT}]`);      
    })
}

server().catch(e => console.log(e))