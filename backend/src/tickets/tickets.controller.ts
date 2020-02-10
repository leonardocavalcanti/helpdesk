import * as express from 'express';
import * as paginate from 'express-paginate';
import * as graphqlHTTP from 'express-graphql';

import Ticket from './ticket.interface';
import Controller from '../interfaces/controller.interface';
import { ticketModel, TicketSchema } from './tickets.model';

class TicketsController implements Controller {
    public path = '/tickets';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        // this.router.get(this.path, keycloak.protect("read-tickets"), this.list);
        this.router.get(this.path, this.list);
        this.router.post(this.path, this.create);
        this.router.use(`${this.path}/graphql`,
            graphqlHTTP(request => {
                const startTime = Date.now();
                return {
                    schema: TicketSchema,
                    graphiql: true,
                    extensions({ document, variables, operationName, result }) {
                        return { runTime: Date.now() - startTime };
                    }
                };
            })
        );
    }

    list = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const [results, itemCount] = await Promise.all([
                ticketModel.find().limit(req.query.limit).skip((req.query.page - 1) * req.query.limit).lean().exec(),
                ticketModel.find().estimatedDocumentCount({})
            ]);

            const pageCount = Math.ceil(itemCount / req.query.limit);

            res.json({
                content: results,
                pageCount,
                itemCount,
                pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
            });
        } catch (err) {
            next(err);
        }
    }

    create = (request: express.Request, response: express.Response) => {
        const ticketData: Ticket = { ...request.body, created: new Date(), state: request.body.state || "open" };
        const createdTicket = new ticketModel(ticketData);
        createdTicket.save()
            .then(savedTicket => {
                response.status(201);
                response.send(savedTicket);
            })
    }
}

export default TicketsController;