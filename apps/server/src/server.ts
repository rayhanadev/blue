import { Elysia, t } from "elysia";

const app = new Elysia();

export type App = typeof app;
export { app };
