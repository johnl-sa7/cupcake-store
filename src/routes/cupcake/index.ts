import {Elysia, t} from 'elysia';
import {CupcakeService} from 'services/Cupcake/index';
// localhost:3049/api/cupcakes

const cupcakesRoutes = new Elysia({prefix: '/cupcake'})
    .get('/', () => CupcakeService.getCupcakes())
    .post('/', ({body}) => CupcakeService.addCupcake(body), {
        body: t.Object({
            name: t.String({
                minLength: 2,
                maxLength: 16,
            }),
            description: t.String({
                minLength: 3,
                maxLength: 50,
            }),
            price: t.Numeric(),
            ingredients: t.Array(t.String({})),
        }),
    })
    .get('/:id', ({params: {id}}) => CupcakeService.getCupcake(id), {
        params: t.Object({
            id: t.Numeric(),
        }),
    })
    .patch(
        '/:id',
        ({params: {id}, body}) => CupcakeService.updateCupcake(id, body),
        {
            params: t.Object({
                id: t.Numeric(),
            }),
            body: t.Object(
                {
                    name: t.Optional(
                        t.String({
                            minLength: 2,
                            maxLength: 16,
                        })
                    ),
                    description: t.Optional(
                        t.String({
                            minLength: 3,
                            maxLength: 50,
                        })
                    ),
                    price: t.Optional(t.Numeric()),
                    ingredients: t.Optional(t.Array(t.String())),
                },
                {minProperties: 1}
            ),
        }
    )
    .delete('/:id', ({params: {id}}) => CupcakeService.deleteCupcake(id), {
        params: t.Object({
            id: t.Numeric(),
        }),
    });

export default cupcakesRoutes;
