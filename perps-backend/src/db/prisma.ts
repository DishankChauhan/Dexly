import { PrismaClient } from '../../generated/prisma/index.js';

// Create a singleton instance of PrismaClient
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
});

// Handle connection errors
prisma.$connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

// Handle process termination
process.on('exit', () => {
  prisma.$disconnect();
});

export default prisma; 