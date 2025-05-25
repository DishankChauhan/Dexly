#!/usr/bin/env node

import axios from 'axios';

// Configuration
const BASE_URL = 'http://localhost:3000/api';
const TEST_ADDRESS = 'DemoUserPublicKey123'; // Mock address for testing

console.log('🧪 Testing New API Endpoints');
console.log('================================\n');

async function testEndpoint(name, url, expectedFields = []) {
  try {
    console.log(`Testing ${name}...`);
    const response = await axios.get(url, { timeout: 5000 });
    
    if (response.status === 200) {
      console.log(`✅ ${name} - Status: ${response.status}`);
      
      if (response.data.success) {
        console.log(`✅ ${name} - Success: true`);
        
        // Check if expected fields exist in the response
        if (expectedFields.length > 0 && response.data.data) {
          const missingFields = expectedFields.filter(field => 
            !(field in response.data.data)
          );
          
          if (missingFields.length === 0) {
            console.log(`✅ ${name} - All expected fields present`);
          } else {
            console.log(`⚠️  ${name} - Missing fields: ${missingFields.join(', ')}`);
          }
        }
        
        // Show sample of response data
        if (response.data.data) {
          const keys = Object.keys(response.data.data).slice(0, 3);
          console.log(`📊 ${name} - Sample data: {${keys.join(', ')}, ...}`);
        }
      } else {
        console.log(`❌ ${name} - Success: false`);
        console.log(`   Error: ${response.data.error || 'Unknown error'}`);
      }
    } else {
      console.log(`❌ ${name} - Status: ${response.status}`);
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log(`⚠️  ${name} - Server not running (connection refused)`);
    } else if (error.response) {
      console.log(`❌ ${name} - HTTP ${error.response.status}: ${error.response.data?.error || error.message}`);
    } else {
      console.log(`❌ ${name} - Error: ${error.message}`);
    }
  }
  console.log('');
}

async function runTests() {
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Test Address: ${TEST_ADDRESS}\n`);

  // Test PnL endpoints
  console.log('📈 PnL API Tests');
  console.log('=================');
  
  await testEndpoint(
    'User PnL Summary',
    `${BASE_URL}/pnl/${TEST_ADDRESS}`,
    ['summary', 'positions']
  );
  
  await testEndpoint(
    'PnL History',
    `${BASE_URL}/pnl/${TEST_ADDRESS}/history?timeframe=30d`,
    ['timeframe', 'history']
  );
  
  await testEndpoint(
    'Position PnL',
    `${BASE_URL}/pnl/position/demo-position-id`,
    ['positionId', 'marketSymbol']
  );

  // Test Stats endpoints
  console.log('📊 Stats API Tests');
  console.log('==================');
  
  await testEndpoint(
    'Portfolio Overview',
    `${BASE_URL}/stats/portfolio/${TEST_ADDRESS}`,
    ['totalPortfolioValue', 'totalPnl', 'openPositions']
  );
  
  await testEndpoint(
    'Trading Statistics',
    `${BASE_URL}/stats/trading/${TEST_ADDRESS}?timeframe=30d`,
    ['totalTrades', 'winRate', 'profitFactor']
  );
  
  await testEndpoint(
    'Performance Metrics',
    `${BASE_URL}/stats/performance/${TEST_ADDRESS}`,
    ['daily', 'totalReturn', 'totalReturnPercentage']
  );
  
  await testEndpoint(
    'Leaderboard',
    `${BASE_URL}/stats/leaderboard?timeframe=30d&limit=10`,
    ['leaderboard', 'totalTraders']
  );

  // Test existing endpoints for comparison
  console.log('🔄 Existing API Tests (for comparison)');
  console.log('======================================');
  
  await testEndpoint(
    'Markets List',
    `${BASE_URL}/markets`,
    ['markets']
  );
  
  await testEndpoint(
    'Server Health',
    `${BASE_URL.replace('/api', '')}/health`,
    ['status']
  );

  console.log('🏁 Test Summary');
  console.log('===============');
  console.log('Tests completed! Check the results above.');
  console.log('If you see connection refused errors, start the server with:');
  console.log('npm start (in the perps-backend directory)');
}

// Run tests
runTests().catch(console.error); 