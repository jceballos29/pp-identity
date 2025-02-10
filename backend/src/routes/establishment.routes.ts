import { Router } from 'express';
import { validator } from '../middleware/validator';
import {
  establishmentController,
  EstablishmentController,
} from '../controllers/establishment.controller';
import {
  createEstablishmentSchema,
  deleteEstablishmentSchema,
  getEstablishmentSchema,
  getEstablishmentsSchema,
  updateEstablishmentSchema,
} from '../schemas/establishment.schema';

export class EstablishmentRoutes {
  private readonly controller: EstablishmentController;
  private readonly router: Router;

  constructor() {
    this.controller = establishmentController;
    this.router = Router();
  }

  public getRoutes(): Router {
    this.router.post(
      '/',
      validator(createEstablishmentSchema),
      this.controller.create.bind(this.controller),
    );
    this.router.get(
      '/',
      validator(getEstablishmentsSchema),
      this.controller.findAll.bind(this.controller),
    );
    this.router.get(
      '/:id',
      validator(getEstablishmentSchema),
      this.controller.findById.bind(this.controller),
    );
    this.router.put(
      '/:id',
      validator(updateEstablishmentSchema),
      this.controller.update.bind(this.controller),
    );
    this.router.delete(
      '/:id',
      validator(deleteEstablishmentSchema),
      this.controller.delete.bind(this.controller),
    );

    return this.router;
  }
}

export const establishmentRoutes = new EstablishmentRoutes();