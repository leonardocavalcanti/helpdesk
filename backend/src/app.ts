import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as paginate from 'express-paginate';
import * as cors from 'cors';
import Controller from './interfaces/controller.interface';
import TicketsController from './tickets/tickets.controller';
import { session, keycloak } from './middleware/auth.middleware';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.connectToTheDatabase();
        this.initializeMiddlewares();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(paginate.middleware(10, 50));
        this.app.use(cors());
        this.app.use(session);
        this.app.use(keycloak.middleware({ logout: "/" }));

        this.initializeControllers(
            [
                new TicketsController()
            ]
        );
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/api/', controller.router);
        });
    }

    private connectToTheDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
}

export default App;