import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Hono } from "hono";
import { serveStatic } from '@hono/node-server/serve-static'
import posts from "./features/posts/api";
import message from './features/messages/api';
import auth from "./features/auth/api";
import users from "./features/users/api";
import subscribers from './features/subscribers/api';
import events from './features/events/api';
import assets from './features/assets/api';
import comments from "./features/comments/api";
import testimonials from "./features/testimonials/api";
import reservations from "./features/reservations/api";

// error handling middleware
import { errorHandler } from "./middleware/errorHandler";

const app = new Hono();
app.use("*", cors());
app.use("*", logger());
app.use("*", errorHandler);

app.use('/', serveStatic({ root: './public' }));
app.use('/file-bucket/*', serveStatic({ root: './public' }));

app.route("auth", auth);
app.route("assets", assets);
app.route("users", users);
app.route("events", events);
app.route("posts", posts);
app.route("comments", comments);
app.route("reservations", reservations);
app.route("testimonials", testimonials);
app.route("subscribers", subscribers);
app.route("contact-us", message);

export default app;
