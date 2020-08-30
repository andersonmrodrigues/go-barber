import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../repository/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import { getCustomRepository } from "typeorm";

import ensureAUthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAUthenticated);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();
  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
