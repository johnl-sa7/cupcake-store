-- CreateTable
CREATE TABLE "Cupcake" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "ingredients" TEXT[],

    CONSTRAINT "Cupcake_pkey" PRIMARY KEY ("id")
);
