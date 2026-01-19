import { Hono } from "hono";
import { getAllComments } from "./services";

const comments = new Hono();

comments.get("/", async (c) => {
    
    const comments = await getAllComments();
    if (comments) {
        return c.json({
            success: true,
            data: comments
        });
    } else {
        return c.json({ message: "No comments found" }, 404);
    }
});



export default comments;