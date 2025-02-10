import { Router } from "express";
import { regionalRoutes } from "./regional.routes";
import { establishmentRoutes } from "./establishment.routes";

export class Routes {
  private readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public getRoutes(): Router {
    this.router.use("/regionals", regionalRoutes.getRoutes());
    this.router.use("/establishments", establishmentRoutes.getRoutes());
    return this.router;
  }
}

export const routes = new Routes();

