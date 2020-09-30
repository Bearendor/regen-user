import sequelize from 'sequelize';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

export default class Database {

    db: string;
    user: string;
    password: string;
    host: string;
    port: number;
    maxPool: number;
    minPool: number;
    database: sequelize.Sequelize;

    constructor() {
        this.db = process.env.DB_NAME || 'regenhealth';
        this.user = process.env.DB_USER || 'root';
        this.password = process.env.DB_PASS || 'root';
        this.host = process.env.DB_HOST || 'localhost';
        this.port = Number(process.env.DB_PORT) || 3306;
        this.maxPool = Number(process.env.MAX_POOL) || 10;
        this.minPool = Number(process.env.MIN_POOL) || 1;

        this.database = new Sequelize(this.db, this.user, this.password, {
            host: this.host,
            dialect: 'mysql',
            port: this.port,
            logging: false,
            // operatorsAliases: false,
            pool: {
                max: this.maxPool,
                min: this.minPool,
                acquire: 30000,
                idle: 10000
            }
        })

        this.database.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        this.database.sync({
            // Using 'force' will drop any table defined in the models and create them again.
            // force: true
        })
    }
}