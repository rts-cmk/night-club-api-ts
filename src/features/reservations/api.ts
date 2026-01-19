import { Hono } from "hono";
import { z } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { jwt } from 'hono/jwt'
import { reservationsSchema, type NewReservation } from "./validation";
import { getAllReservations, createReservation } from "./services";

const reservations = new Hono();

reservations.post("/",
      jwt({ secret: process.env.JWT_SECRET as string }),
    
    zValidator("json", reservationsSchema, (result, c) => {
        if (!result.success) {
            const validationError = result.error as z.ZodError<NewReservation>
            const errorTree = z.treeifyError(validationError)
            return c.json({ 
                success: false, 
                error: "VALIDATION ERROR", 
                message: "Invalid reservation payload", 
                data: errorTree 
            }, 400);
        }
    }),
    async (c) => {
        const payload = c.get("jwtPayload");
    if (!payload) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    console.log("JWT Payload:", payload);
        const userId = Number(payload.id);
        const body: NewReservation = await c.req.valid("json");
        const result = await createReservation(userId, body);
        return c.json({
            success: true,
            message: "Reservation created",
            data: result
        }, 201);
    }
);

reservations.get("/", async (c) => {
    const reservationsList = await getAllReservations();
    return c.json({ success: true, data: reservationsList });
    
});

export default reservations;