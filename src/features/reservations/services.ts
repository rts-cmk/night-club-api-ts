// src/services/messages.service.ts
import prisma, { Prisma } from "../../../lib/prisma";
import { Reservation, NewReservation } from "./validation";

  export async function createReservation (userId: number, data: NewReservation) {
    const reservation = await prisma.booking.create({ 
      data: { ...data, userId } 
    });
    return reservation;
  }

  export async function getAllReservations () {
    return await prisma.booking.findMany();
  }


