# cupcake-store Elysia with Node/Bun runtime

This application is built using Docker, Node.js/Bun, ElysiaJS for server-side logic, Prisma for database management, and PostgreSQL as the relational database.

## **Technologies Used**

-   **Docker**: Simplifies deployment by containerizing the application.
-   **Node.js**: The runtime environment for executing JavaScript on the server side.
-   **ElysiaJS**: A fast, minimalist web framework for Node.js applications.
-   **Prisma**: Serves as the ORM for handling database operations.
-   **PostgreSQL**: The underlying relational database to store application data.

## **Getting Started**

These instructions will guide you through setting up and running a copy of the project on your local machine for development and testing purposes.

### **Prerequisites**

Before you begin, ensure you have the following installed:

-   Docker and Docker Compose
-   Node.js (for running the project outside of Docker)
-   Bun (optional, for an alternative runtime environment)

### **Setup and Installation**

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-repository/8flow.git
    cd 8flow
    ```

2. **Environment Configuration**

    Duplicate the `.env.example` file to `.env` and update it with your PostgreSQL database credentials and other necessary environment variables.

    ```plaintext
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```

3. **Build the Docker Containers**

    - To run the whole project with Docker, follow the steps below:
      Use Docker Compose to build the application and database containers:

    ```sh
    docker-compose build
    ```

    The app can be run with or without Docker.

    - To run the project without Docker, you can use the `bun` command-line tool to start the application.
    - to run the DB in docker use the following command:
        - docker run --name dev-postgres -p 5432:5432 -e POSTGRES_PASSWORD=12345678 -d postgres

4. **Start the Application**

    Launch your application with Docker Compose:

    ```sh
    docker-compose up
    ```

    Your application should now be accessible at `http://localhost:8080`.

### **Database Schema**

The application uses Prisma to manage database interactions. Here's an example schema for a `Cupcake` model:

```prisma
model Cupcake {
    id          Int     @id @default(autoincrement())
    name        String  @db.Text()
    description String  @db.Text()
    price       Float   @db.Real
    ingredients String[]
}
```

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To Generate the Prisma Client to interact with the db:

```bash
npm run generate
```

To Seed the DB with some data:

```bash
npm run seed
```

To start the development server run:

```bash
bun run dev
```

to run tests:

```bash
bun test
```

Open http://localhost:3000/ with your browser to see the result.
