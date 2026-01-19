import { z } from 'zod'
import { id } from 'zod/v4/locales';
import { UserScalarFieldEnum } from '../../../generated/prisma/internal/prismaNamespace';

export const reservationsSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  tableNum: z.number().min(1, "Table number is required"),
  noOfGuests: z.number().min(1, "Number of guests is required"),
  phone: z.string().min(1, "Phone number is required"),
  userId: z.number().optional(),
  comment: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
  .transform((value) => new Date(`${value}T21:00`)),
});

export type Reservation = z.infer<typeof reservationsSchema>;
export type NewReservation = Omit<Reservation, 'id'>;
