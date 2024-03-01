import {Elysia} from 'elysia';
import {swagger} from '@elysiajs/swagger';

import cupcakesRoutes from 'routes/cupcake';

const app = new Elysia();

app.use(swagger())
    .group('/api', (app) => app.use(cupcakesRoutes))
    .listen(process.env.PORT || 3049);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
