const {PrismaClient} = require('@prisma/client');

const client = new PrismaClient();

const cupcakesToCreate = [
    {
        id: 0,
        name: 'Choc',
        description: 'Chocolate',
        price: 2.5,
        ingredients: ['flour', 'egg', 'cocoa'],
    },
    {
        id: 1,
        name: 'Van',
        description: 'Vanilla',
        price: 2.5,
        ingredients: ['flour', 'egg', 'vanilla bean'],
    },
    {
        id: 2,
        name: 'Str',
        description: 'Strawberry',
        price: 3.0,
        ingredients: ['flour', 'egg', 'strawberry'],
    },
];

const seed = async (cupcakes) => {
    console.log('creating cupcakes');

    for (let i = 0; i < cupcakes.length; i++) {
        // const cupcake = cupcakes[i];
        await client.cupcake.upsert({
            where: {id: cupcakes[i].id},
            update: cupcakes[i],
            create: cupcakes[i],
        });
    }
};

seed(cupcakesToCreate)
    .then(() => {
        console.log('cupcakes created');
    })
    .catch((error) => {
        console.error('error:', error);
    })
    .finally(() => {
        client.$disconnect();
        console.log('Disconnected Prisma Client, exiting');
    });
