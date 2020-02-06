import 'dotenv/config';
import App from './app';
import TicketsController from './tickets/tickets.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
    [
        new TicketsController()
    ]
);

app.listen();