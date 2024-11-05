import { Sequelize } from "sequelize";
import 'dotenv/config';

const credential = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    driver: process.env.DB_DRIVER
};


const connectionString = `${credential.driver}://${credential.username}:${credential.password}@${credential.host}:${credential.port}/${credential.database}`;
const Connection = new Sequelize(connectionString, {
    logging: (...msg) => console.log(msg)
});

export default Connection;