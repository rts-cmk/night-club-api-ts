import { Hono } from "hono";
import { getAllImages } from "./services";


const galleryImages = new Hono();

galleryImages.get("/", async (c) => {
    const imageList = await getAllImages();
    return c.json({ success: true, data: imageList });
});

export default galleryImages;