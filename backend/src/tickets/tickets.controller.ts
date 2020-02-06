import * as express from 'express';
import * as paginate from 'express-paginate';
import * as Keycloak from 'keycloak-connect';

import Ticket from './ticket.interface';
import Controller from '../interfaces/controller.interface';
import ticketModel from './tickets.model';

class TicketsController implements Controller {
    public path = '/tickets';
    public router = express.Router();

    constructor() {
    }

    public intializeRoutes(keycloak: Keycloak) {
        this.router.get(this.path, keycloak.protect(), this.list);
        this.router.post(this.path, this.create);
    }

    list = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {

            const [results, itemCount] = await Promise.all([
                ticketModel.find({}).limit(req.query.limit).skip(req.query.skip).lean().exec(),
                ticketModel.estimatedDocumentCount({})
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
        const ticketData: Ticket = request.body;
        const createdTicket = new ticketModel(ticketData);
        createdTicket.save()
            .then(savedTicket => {
                response.status(201);
                response.send(savedTicket);
            })
    }
}

export default TicketsController;