# Stage 1: Use Node.js to install dependencies and generate Prisma client
FROM node:alpine AS builder
WORKDIR /app

# Copy package.json and other necessary files
COPY package.json .
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Stage 2: Setup the Bun environment
FROM oven/bun AS runtime
WORKDIR /app

# Copy generated Prisma client and other necessary files from builder stage
COPY --from=builder /app/node_modules/@prisma/client /app/node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY . .

# Set the environment to production (or development, based on your needs)
ENV NODE_ENV production

# Command to run your app with Bun
CMD ["bun", "run", "src/index.ts"]

# Expose port 3000 for your app
EXPOSE 3000
