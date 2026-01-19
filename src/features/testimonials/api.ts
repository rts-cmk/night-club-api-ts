import { Hono } from "hono";
import { z } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { NewTestimonial, testimonialSchema } from "./validation";
import { getAllTestimonials, createTestimonial } from "./services";

const testimonials = new Hono();

testimonials.get("/", async (c) => {
    const testimonialsList = await getAllTestimonials();
    return c.json({ success: true, data: testimonialsList });
});

testimonials.post("/",
    zValidator("json", testimonialSchema, (result, c) => {
        if (!result.success) {
            const validationError = result.error as z.ZodError<NewTestimonial>
            const errorTree = z.treeifyError(validationError)
            return c.json({
                success: false,
                error: "VALIDATION ERROR",
                message: "Invalid testimonial payload",
                data: errorTree
            }, 400);
        }
    }),
    async (c) => {
        const body: NewTestimonial = await c.req.valid("json");
        const result = await createTestimonial(body);
        return c.json({ success: true, data: result }, 201);
    } 
);

export default testimonials;