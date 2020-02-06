import { Router } from 'express';

interface Controller {
  path: string;
  router: Router;
  intializeRoutes: any;
}
 
export default Controller;