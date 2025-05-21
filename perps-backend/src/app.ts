import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { AddressInfo } from 'net';
import { createServer } from 'http';
import config from './config/index.js';
import { SchedulerService } from './services/scheduler.js';
import { WebSocketService } from './services/websocket/websocketService.js';
import { SolanaClient } from './services/blockchain/solanaClient.js';
import { PerpsContractService } from './services/blockchain/perpsContractService.js';

// Import routes (will create these next)
import apiRoutes from './api/routes/index.js';

// Create Express application
const app = express();
const httpServer = createServer(app);

// Initialize services
const solanaClient = new SolanaClient();
const contractService = new PerpsContractService(solanaClient);

// Apply middlewares
app.use(helmet()); // Security headers
app.use(cors()); // CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan(config.NODE_ENV === 'development' ? 'dev' : 'combined')); // Logging

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', apiRoutes);

// Initialize WebSocket server if enabled
let wsService: WebSocketService | null = null;
if (config.WEBSOCKET_ENABLED) {
  wsService = new WebSocketService(httpServer, contractService, solanaClient);
  console.log('WebSocket service initialized');
}

// Initialize the scheduler
const scheduler = new SchedulerService(wsService);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const server = httpServer.listen(config.PORT, () => {
  const { port } = server.address() as AddressInfo;
  console.log(`Server listening on port ${port}`);
  
  // Start scheduled tasks
  if (config.NODE_ENV !== 'test') {
    scheduler.startScheduler();
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received, shutting down gracefully');
  
  // Stop scheduler
  scheduler.stopScheduler();
  
  // Cleanup WebSocket connections if enabled
  if (wsService) {
    wsService.stopDataBroadcasts();
  }
  
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app; 