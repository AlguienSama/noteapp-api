import { ConnectionOptions } from "typeorm";

const ormconfig: ConnectionOptions = {
    "type": "postgres",
    "host": process.env["DB_HOST"],
    "port": parseInt(process.env["DB_PORT"]),
    "username": process.env["DB_USERNAME"],
    "password": process.env["DB_PASSWORD"],
    "database": process.env["DB_DATABASE"],
    "synchronize": true,
    "logging": [],
    "entities": [
        "src/entitys/**/*.ts"
    ],
    "migrations": [
        "src/migrations/**/*.ts"
    ],
    "subscribers": [
        "src/subscribers/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entitys",
        "migrationsDir": "src/migrations",
        "subscribersDir": "src/subscribers"
    }
};

export default ormconfig;