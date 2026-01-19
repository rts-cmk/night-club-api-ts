
import { Hono } from "hono";
import z, { success, treeifyError, ZodError } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { eventSchema, type NewEvent } from "./validation";
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from "./servces";

const events = new Hono();

events.get("/", async (c) => {
    let events = await getAllEvents();
    return c.json({ success: true, data: events });
});


events.get("/:id", async (c) => {
        const id = c.req.param("id");
        let event = await getEventById(Number(id));
        return c.json({success: true, data: event});
});

events.post("/", 
     zValidator("json", eventSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as ZodError<NewEvent>
      const errorTree = treeifyError(validationError)
      return c.json({ 
        success: false,
        error: "VALIDATION ERROR",
        message: "Invalid event payload",
        data: errorTree
       }, 400);
    }
  }),
    
    async (c) => {
    // Implementation for creating a new event
    const body: NewEvent = await c.req.valid("json");
      const event = await createEvent(body);
      return c.json({ 
        success: true, 
        message: "Event created", 
        data: event 
      }, 201);
});

events.put("/:id", 
  zValidator("json", eventSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as ZodError<NewEvent>
      const errorTree = treeifyError(validationError)
      return c.json({ 
        success: false,
        error: "VALIDATION ERROR",
        message: "Invalidt event payload",
        data: errorTree
       }, 400);
    }
  }),
  async (c) => {
    const id = c.req.param("id");
    const body: NewEvent = await c.req.valid("json");
    const event = await updateEvent(Number(id), body);
    return c.json({ 
      success: true, 
      message: "Event updated",
      data: event 
    }, 200);
});

events.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await deleteEvent(Number(id));
  return c.json({ success: true, message: "Event deleted" }, 200);
});

export default events;