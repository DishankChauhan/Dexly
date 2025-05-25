export type Perps = {
  "version": "0.1.0",
  "name": "perps",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [],
      "args": []
    },
    {
      "name": "getSwitchboardPrice",
      "accounts": [
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeGlobalState",
      "accounts": [
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeMarket",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "assetSymbol",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        },
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "oracleType",
          "type": "u8"
        },
        {
          "name": "maxLeverage",
          "type": "u8"
        },
        {
          "name": "minMarginRatioBps",
          "type": "u16"
        },
        {
          "name": "feeBps",
          "type": "u16"
        },
        {
          "name": "minPositionSize",
          "type": "u64"
        },
        {
          "name": "maxPriceImpactBps",
          "type": "u16"
        },
        {
          "name": "kFactor",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeVault",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "collateralType",
          "type": "u8"
        },
        {
          "name": "oracleType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "depositCollateral",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault account to store collateral"
          ]
        },
        {
          "name": "collateralMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The collateral mint"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawCollateral",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault account to withdraw collateral from"
          ]
        },
        {
          "name": "collateralMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The collateral mint"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "openPosition",
      "accounts": [
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The position account to initialize"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this position"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "isLong",
          "type": "bool"
        },
        {
          "name": "collateralAmount",
          "type": "u64"
        },
        {
          "name": "leverage",
          "type": "u8"
        },
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "positionId",
          "type": "u64"
        },
        {
          "name": "maxSlippageBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "closePosition",
      "accounts": [
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The position account to close"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this position"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "maxSlippageBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "updateFunding",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market account to update"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "liquidatePosition",
      "accounts": [
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The position account to liquidate"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this position"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user's account"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "liquidator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The liquidator's account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "placeOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The order account to initialize"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this order"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u64"
        },
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderType",
          "type": "u8"
        },
        {
          "name": "isLong",
          "type": "bool"
        },
        {
          "name": "size",
          "type": "u64"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "collateral",
          "type": "u64"
        },
        {
          "name": "leverage",
          "type": "u8"
        },
        {
          "name": "maxSlippageBps",
          "type": "u16"
        },
        {
          "name": "positionId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The order account to cancel"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "executeOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The order account to execute"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this order"
          ]
        },
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The executor (can be anyone)"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "order",
      "docs": [
        "Order account to place limit, stop loss, and take profit orders"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "User who placed the order"
            ],
            "type": "publicKey"
          },
          {
            "name": "market",
            "docs": [
              "Market this order is for"
            ],
            "type": "publicKey"
          },
          {
            "name": "orderType",
            "docs": [
              "Order type"
            ],
            "type": "u8"
          },
          {
            "name": "isLong",
            "docs": [
              "Direction of the order (true = long, false = short)"
            ],
            "type": "bool"
          },
          {
            "name": "size",
            "docs": [
              "Size of the order in base asset units"
            ],
            "type": "u64"
          },
          {
            "name": "price",
            "docs": [
              "Target price for limit/stop loss/take profit orders"
            ],
            "type": "u64"
          },
          {
            "name": "collateral",
            "docs": [
              "Collateral amount for the position"
            ],
            "type": "u64"
          },
          {
            "name": "leverage",
            "docs": [
              "Leverage used for this order"
            ],
            "type": "u8"
          },
          {
            "name": "isActive",
            "docs": [
              "Whether the order has been filled or cancelled"
            ],
            "type": "bool"
          },
          {
            "name": "maxSlippageBps",
            "docs": [
              "Max slippage in basis points (for market orders)"
            ],
            "type": "u16"
          },
          {
            "name": "createdAt",
            "docs": [
              "Timestamp when order was placed"
            ],
            "type": "i64"
          },
          {
            "name": "positionId",
            "docs": [
              "Position ID to create when filled"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          },
          {
            "name": "executionPrice",
            "docs": [
              "Execution price of the order"
            ],
            "type": "u64"
          },
          {
            "name": "fee",
            "docs": [
              "Fee charged for the order"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "globalState",
      "docs": [
        "Global state account for protocol-wide settings"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "docs": [
              "Admin authority"
            ],
            "type": "publicKey"
          },
          {
            "name": "protocolFeeBps",
            "docs": [
              "Protocol fee in basis points"
            ],
            "type": "u16"
          },
          {
            "name": "totalVolume",
            "docs": [
              "Total volume traded"
            ],
            "type": "u64"
          },
          {
            "name": "totalFees",
            "docs": [
              "Total fees collected"
            ],
            "type": "u64"
          },
          {
            "name": "emergencyPaused",
            "docs": [
              "Emergency pause flag"
            ],
            "type": "bool"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "market",
      "docs": [
        "Market state account for a trading pair"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetSymbol",
            "docs": [
              "Asset symbol (e.g., \"BTC\")"
            ],
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "oracle",
            "docs": [
              "Oracle price feed pubkey"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracleType",
            "docs": [
              "Oracle type (0 = Pyth, 1 = Switchboard)"
            ],
            "type": "u8"
          },
          {
            "name": "baseAssetReserve",
            "docs": [
              "Base asset reserve (asset amount)"
            ],
            "type": "u64"
          },
          {
            "name": "quoteAssetReserve",
            "docs": [
              "Quote asset reserve (USDC amount)"
            ],
            "type": "u64"
          },
          {
            "name": "fundingRate",
            "docs": [
              "Current funding rate (can be positive or negative)"
            ],
            "type": "i64"
          },
          {
            "name": "lastFundingTs",
            "docs": [
              "Last timestamp when funding was updated"
            ],
            "type": "i64"
          },
          {
            "name": "totalLongSize",
            "docs": [
              "Total long positions size"
            ],
            "type": "u64"
          },
          {
            "name": "totalShortSize",
            "docs": [
              "Total short positions size"
            ],
            "type": "u64"
          },
          {
            "name": "maxLeverage",
            "docs": [
              "Maximum allowed leverage for this market"
            ],
            "type": "u8"
          },
          {
            "name": "minMarginRatioBps",
            "docs": [
              "Minimum margin ratio in basis points"
            ],
            "type": "u16"
          },
          {
            "name": "feeBps",
            "docs": [
              "Fee in basis points"
            ],
            "type": "u16"
          },
          {
            "name": "isActive",
            "docs": [
              "Whether the market is active"
            ],
            "type": "bool"
          },
          {
            "name": "authority",
            "docs": [
              "Authority that can update market parameters"
            ],
            "type": "publicKey"
          },
          {
            "name": "minPositionSize",
            "docs": [
              "Minimum position size"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          },
          {
            "name": "maxPriceImpactBps",
            "docs": [
              "Maximum price impact in basis points"
            ],
            "type": "u16"
          },
          {
            "name": "kFactor",
            "docs": [
              "K factor to scale the virtual AMM"
            ],
            "type": "u64"
          },
          {
            "name": "minBaseAssetReserve",
            "docs": [
              "Minimum base asset reserve (safety parameter)"
            ],
            "type": "u64"
          },
          {
            "name": "minQuoteAssetReserve",
            "docs": [
              "Minimum quote asset reserve (safety parameter)"
            ],
            "type": "u64"
          },
          {
            "name": "maxOracleDeviationBps",
            "docs": [
              "Maximum oracle price deviation allowed (in basis points)"
            ],
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "position",
      "docs": [
        "Position account to track user's open positions"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "User who owns this position"
            ],
            "type": "publicKey"
          },
          {
            "name": "market",
            "docs": [
              "Market this position is for"
            ],
            "type": "publicKey"
          },
          {
            "name": "isLong",
            "docs": [
              "Direction of the position (true = long, false = short)"
            ],
            "type": "bool"
          },
          {
            "name": "size",
            "docs": [
              "Size of the position in base asset units"
            ],
            "type": "u64"
          },
          {
            "name": "entryPrice",
            "docs": [
              "Entry price of the position"
            ],
            "type": "u64"
          },
          {
            "name": "collateral",
            "docs": [
              "Collateral amount in quote asset units (e.g., USDC)"
            ],
            "type": "u64"
          },
          {
            "name": "leverage",
            "docs": [
              "Leverage used for this position"
            ],
            "type": "u8"
          },
          {
            "name": "openedAt",
            "docs": [
              "Timestamp when position was opened"
            ],
            "type": "i64"
          },
          {
            "name": "lastFundingTs",
            "docs": [
              "Last funding payment timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "realizedPnlFromFunding",
            "docs": [
              "Realized PnL from funding payments"
            ],
            "type": "i64"
          },
          {
            "name": "liquidationPrice",
            "docs": [
              "Liquidation price"
            ],
            "type": "u64"
          },
          {
            "name": "isClosed",
            "docs": [
              "Whether position is closed"
            ],
            "type": "bool"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "user",
      "docs": [
        "User account to track user's collateral and positions"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "User public key"
            ],
            "type": "publicKey"
          },
          {
            "name": "collateralBalance",
            "docs": [
              "Collateral balance in quote asset units (e.g., USDC)"
            ],
            "type": "u64"
          },
          {
            "name": "openPositions",
            "docs": [
              "Number of open positions"
            ],
            "type": "u8"
          },
          {
            "name": "realizedPnl",
            "docs": [
              "Total realized PnL"
            ],
            "type": "i64"
          },
          {
            "name": "positions",
            "docs": [
              "Array of position pubkeys (fixed size to avoid stack issues)"
            ],
            "type": {
              "array": [
                "publicKey",
                10
              ]
            }
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vault",
      "docs": [
        "Vault account to store user collateral"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Mint of the token (e.g., USDC mint)"
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "Authority of the vault (program PDA)"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "docs": [
              "Token account owned by the vault authority"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalDeposits",
            "docs": [
              "Total deposits in the vault"
            ],
            "type": "u64"
          },
          {
            "name": "collateralType",
            "docs": [
              "Type of collateral stored in this vault"
            ],
            "type": "u8"
          },
          {
            "name": "oracle",
            "docs": [
              "Oracle account for price feed (for non-stablecoin collateral)"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracleType",
            "docs": [
              "Oracle type (0 = Pyth, 1 = Switchboard)"
            ],
            "type": "u8"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          },
          {
            "name": "authorityBump",
            "docs": [
              "Bump seed for vault authority PDA"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "feeVault",
      "docs": [
        "Fee vault to collect protocol fees"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Mint of the fee token (e.g., USDC mint)"
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "Authority that can withdraw fees"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "docs": [
              "Token account owned by the vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalFees",
            "docs": [
              "Total fees collected"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "OrderType",
      "docs": [
        "Order types supported by the protocol"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Market"
          },
          {
            "name": "Limit"
          },
          {
            "name": "StopLoss"
          },
          {
            "name": "TakeProfit"
          }
        ]
      }
    },
    {
      "name": "CollateralType",
      "docs": [
        "Collateral types supported by the protocol"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "USDC"
          },
          {
            "name": "SOL"
          }
        ]
      }
    },
    {
      "name": "OracleType",
      "docs": [
        "Oracle type enum"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Pyth"
          },
          {
            "name": "Switchboard"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "PositionClosedEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "market",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "exitPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "pnl",
          "type": "i64",
          "index": false
        },
        {
          "name": "fee",
          "type": "u64",
          "index": false
        },
        {
          "name": "returnAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "CollateralDepositedEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "GlobalStateInitializedEvent",
      "fields": [
        {
          "name": "admin",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "protocolFeeBps",
          "type": "u16",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "PositionLiquidatedEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "market",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidationPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "pnl",
          "type": "i64",
          "index": false
        },
        {
          "name": "liquidationFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "userReturn",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "PositionOpenedEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "market",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "isLong",
          "type": "bool",
          "index": false
        },
        {
          "name": "size",
          "type": "u64",
          "index": false
        },
        {
          "name": "collateral",
          "type": "u64",
          "index": false
        },
        {
          "name": "entryPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "leverage",
          "type": "u8",
          "index": false
        },
        {
          "name": "liquidationPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "FundingUpdatedEvent",
      "fields": [
        {
          "name": "market",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "fundingRate",
          "type": "i64",
          "index": false
        },
        {
          "name": "longSize",
          "type": "u64",
          "index": false
        },
        {
          "name": "shortSize",
          "type": "u64",
          "index": false
        },
        {
          "name": "skewPercentage",
          "type": "i64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "CollateralWithdrawnEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Overflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6001,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6002,
      "name": "Unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6003,
      "name": "OracleError",
      "msg": "Oracle error"
    },
    {
      "code": 6004,
      "name": "InvalidLeverage",
      "msg": "Invalid leverage"
    },
    {
      "code": 6005,
      "name": "InvalidMarginRatio",
      "msg": "Invalid margin ratio"
    },
    {
      "code": 6006,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6007,
      "name": "PositionClosed",
      "msg": "Position is already closed"
    },
    {
      "code": 6008,
      "name": "CannotLiquidate",
      "msg": "Position cannot be liquidated at current price"
    },
    {
      "code": 6009,
      "name": "InvalidPrice",
      "msg": "Invalid price from oracle"
    },
    {
      "code": 6010,
      "name": "BumpNotFound",
      "msg": "Bump seed not found"
    },
    {
      "code": 6011,
      "name": "InvalidSignature",
      "msg": "Invalid signature"
    },
    {
      "code": 6012,
      "name": "PriceDeviationTooLarge",
      "msg": "Price deviation from oracle is too large"
    },
    {
      "code": 6013,
      "name": "InvalidFundingRate",
      "msg": "Invalid funding rate"
    },
    {
      "code": 6014,
      "name": "InvalidMint",
      "msg": "Invalid mint"
    },
    {
      "code": 6015,
      "name": "InvalidAdminKey",
      "msg": "Invalid admin key"
    },
    {
      "code": 6016,
      "name": "InsufficientCollateral",
      "msg": "Insufficient collateral for margin requirements"
    },
    {
      "code": 6017,
      "name": "ProtocolPaused",
      "msg": "Protocol is paused"
    },
    {
      "code": 6018,
      "name": "MaxPositionsReached",
      "msg": "Maximum positions per user reached"
    },
    {
      "code": 6019,
      "name": "PositionTooSmall",
      "msg": "Position size too small"
    },
    {
      "code": 6020,
      "name": "MarketNotFound",
      "msg": "Market not found"
    },
    {
      "code": 6021,
      "name": "UserNotFound",
      "msg": "User account not found"
    },
    {
      "code": 6022,
      "name": "InvalidSlippage",
      "msg": "Invalid slippage tolerance"
    },
    {
      "code": 6023,
      "name": "SlippageTooHigh",
      "msg": "Price slippage too high"
    },
    {
      "code": 6024,
      "name": "MarketInactive",
      "msg": "Market is not active"
    },
    {
      "code": 6025,
      "name": "InvalidOracle",
      "msg": "Invalid oracle account"
    },
    {
      "code": 6026,
      "name": "FundingUpdateTooSoon",
      "msg": "Funding rate update too soon"
    },
    {
      "code": 6027,
      "name": "InvalidDirection",
      "msg": "Invalid position direction"
    },
    {
      "code": 6028,
      "name": "InvalidPriceInput",
      "msg": "Invalid price"
    },
    {
      "code": 6029,
      "name": "StaleOraclePrice",
      "msg": "Oracle price is stale"
    },
    {
      "code": 6030,
      "name": "InvalidOraclePrice",
      "msg": "Invalid oracle price"
    },
    {
      "code": 6031,
      "name": "InsufficientLiquidity",
      "msg": "Insufficient liquidity"
    },
    {
      "code": 6032,
      "name": "UnsupportedCollateral",
      "msg": "Unsupported collateral type"
    },
    {
      "code": 6033,
      "name": "InvalidOrderType",
      "msg": "Invalid order type"
    },
    {
      "code": 6034,
      "name": "InvalidPriceImpact",
      "msg": "Invalid price impact parameters"
    },
    {
      "code": 6035,
      "name": "PriceImpactTooHigh",
      "msg": "Price impact exceeds maximum allowed"
    },
    {
      "code": 6036,
      "name": "ReservesBelowMinimum",
      "msg": "AMM reserves below minimum threshold"
    },
    {
      "code": 6037,
      "name": "OracleDeviationTooHigh",
      "msg": "Oracle price deviation exceeds maximum allowed"
    },
    {
      "code": 6038,
      "name": "InvalidAmmParameter",
      "msg": "Invalid AMM parameter"
    },
    {
      "code": 6039,
      "name": "InvalidOracleType",
      "msg": "Invalid oracle type"
    },
    {
      "code": 6040,
      "name": "PriceTooHigh",
      "msg": "Price is too high"
    },
    {
      "code": 6041,
      "name": "PriceTooLow",
      "msg": "Price is too low"
    }
  ]
};

export const IDL: Perps = {
  "version": "0.1.0",
  "name": "perps",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [],
      "args": []
    },
    {
      "name": "getSwitchboardPrice",
      "accounts": [
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeGlobalState",
      "accounts": [
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeMarket",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "assetSymbol",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        },
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "oracleType",
          "type": "u8"
        },
        {
          "name": "maxLeverage",
          "type": "u8"
        },
        {
          "name": "minMarginRatioBps",
          "type": "u16"
        },
        {
          "name": "feeBps",
          "type": "u16"
        },
        {
          "name": "minPositionSize",
          "type": "u64"
        },
        {
          "name": "maxPriceImpactBps",
          "type": "u16"
        },
        {
          "name": "kFactor",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeVault",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "collateralType",
          "type": "u8"
        },
        {
          "name": "oracleType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "depositCollateral",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault account to store collateral"
          ]
        },
        {
          "name": "collateralMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The collateral mint"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawCollateral",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault account to withdraw collateral from"
          ]
        },
        {
          "name": "collateralMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The collateral mint"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "openPosition",
      "accounts": [
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The position account to initialize"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this position"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "isLong",
          "type": "bool"
        },
        {
          "name": "collateralAmount",
          "type": "u64"
        },
        {
          "name": "leverage",
          "type": "u8"
        },
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "positionId",
          "type": "u64"
        },
        {
          "name": "maxSlippageBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "closePosition",
      "accounts": [
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The position account to close"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this position"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "maxSlippageBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "updateFunding",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market account to update"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "liquidatePosition",
      "accounts": [
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The position account to liquidate"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this position"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user's account"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "liquidator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The liquidator's account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "placeOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The order account to initialize"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this order"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u64"
        },
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderType",
          "type": "u8"
        },
        {
          "name": "isLong",
          "type": "bool"
        },
        {
          "name": "size",
          "type": "u64"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "collateral",
          "type": "u64"
        },
        {
          "name": "leverage",
          "type": "u8"
        },
        {
          "name": "maxSlippageBps",
          "type": "u16"
        },
        {
          "name": "positionId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The order account to cancel"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user's signer account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "executeOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The order account to execute"
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account"
          ]
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The market for this order"
          ]
        },
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The executor (can be anyone)"
          ]
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The oracle account"
          ]
        },
        {
          "name": "globalState",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The global state account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "order",
      "docs": [
        "Order account to place limit, stop loss, and take profit orders"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "User who placed the order"
            ],
            "type": "publicKey"
          },
          {
            "name": "market",
            "docs": [
              "Market this order is for"
            ],
            "type": "publicKey"
          },
          {
            "name": "orderType",
            "docs": [
              "Order type"
            ],
            "type": "u8"
          },
          {
            "name": "isLong",
            "docs": [
              "Direction of the order (true = long, false = short)"
            ],
            "type": "bool"
          },
          {
            "name": "size",
            "docs": [
              "Size of the order in base asset units"
            ],
            "type": "u64"
          },
          {
            "name": "price",
            "docs": [
              "Target price for limit/stop loss/take profit orders"
            ],
            "type": "u64"
          },
          {
            "name": "collateral",
            "docs": [
              "Collateral amount for the position"
            ],
            "type": "u64"
          },
          {
            "name": "leverage",
            "docs": [
              "Leverage used for this order"
            ],
            "type": "u8"
          },
          {
            "name": "isActive",
            "docs": [
              "Whether the order has been filled or cancelled"
            ],
            "type": "bool"
          },
          {
            "name": "maxSlippageBps",
            "docs": [
              "Max slippage in basis points (for market orders)"
            ],
            "type": "u16"
          },
          {
            "name": "createdAt",
            "docs": [
              "Timestamp when order was placed"
            ],
            "type": "i64"
          },
          {
            "name": "positionId",
            "docs": [
              "Position ID to create when filled"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          },
          {
            "name": "executionPrice",
            "docs": [
              "Execution price of the order"
            ],
            "type": "u64"
          },
          {
            "name": "fee",
            "docs": [
              "Fee charged for the order"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "globalState",
      "docs": [
        "Global state account for protocol-wide settings"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "docs": [
              "Admin authority"
            ],
            "type": "publicKey"
          },
          {
            "name": "protocolFeeBps",
            "docs": [
              "Protocol fee in basis points"
            ],
            "type": "u16"
          },
          {
            "name": "totalVolume",
            "docs": [
              "Total volume traded"
            ],
            "type": "u64"
          },
          {
            "name": "totalFees",
            "docs": [
              "Total fees collected"
            ],
            "type": "u64"
          },
          {
            "name": "emergencyPaused",
            "docs": [
              "Emergency pause flag"
            ],
            "type": "bool"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "market",
      "docs": [
        "Market state account for a trading pair"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetSymbol",
            "docs": [
              "Asset symbol (e.g., \"BTC\")"
            ],
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "oracle",
            "docs": [
              "Oracle price feed pubkey"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracleType",
            "docs": [
              "Oracle type (0 = Pyth, 1 = Switchboard)"
            ],
            "type": "u8"
          },
          {
            "name": "baseAssetReserve",
            "docs": [
              "Base asset reserve (asset amount)"
            ],
            "type": "u64"
          },
          {
            "name": "quoteAssetReserve",
            "docs": [
              "Quote asset reserve (USDC amount)"
            ],
            "type": "u64"
          },
          {
            "name": "fundingRate",
            "docs": [
              "Current funding rate (can be positive or negative)"
            ],
            "type": "i64"
          },
          {
            "name": "lastFundingTs",
            "docs": [
              "Last timestamp when funding was updated"
            ],
            "type": "i64"
          },
          {
            "name": "totalLongSize",
            "docs": [
              "Total long positions size"
            ],
            "type": "u64"
          },
          {
            "name": "totalShortSize",
            "docs": [
              "Total short positions size"
            ],
            "type": "u64"
          },
          {
            "name": "maxLeverage",
            "docs": [
              "Maximum allowed leverage for this market"
            ],
            "type": "u8"
          },
          {
            "name": "minMarginRatioBps",
            "docs": [
              "Minimum margin ratio in basis points"
            ],
            "type": "u16"
          },
          {
            "name": "feeBps",
            "docs": [
              "Fee in basis points"
            ],
            "type": "u16"
          },
          {
            "name": "isActive",
            "docs": [
              "Whether the market is active"
            ],
            "type": "bool"
          },
          {
            "name": "authority",
            "docs": [
              "Authority that can update market parameters"
            ],
            "type": "publicKey"
          },
          {
            "name": "minPositionSize",
            "docs": [
              "Minimum position size"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          },
          {
            "name": "maxPriceImpactBps",
            "docs": [
              "Maximum price impact in basis points"
            ],
            "type": "u16"
          },
          {
            "name": "kFactor",
            "docs": [
              "K factor to scale the virtual AMM"
            ],
            "type": "u64"
          },
          {
            "name": "minBaseAssetReserve",
            "docs": [
              "Minimum base asset reserve (safety parameter)"
            ],
            "type": "u64"
          },
          {
            "name": "minQuoteAssetReserve",
            "docs": [
              "Minimum quote asset reserve (safety parameter)"
            ],
            "type": "u64"
          },
          {
            "name": "maxOracleDeviationBps",
            "docs": [
              "Maximum oracle price deviation allowed (in basis points)"
            ],
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "position",
      "docs": [
        "Position account to track user's open positions"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "User who owns this position"
            ],
            "type": "publicKey"
          },
          {
            "name": "market",
            "docs": [
              "Market this position is for"
            ],
            "type": "publicKey"
          },
          {
            "name": "isLong",
            "docs": [
              "Direction of the position (true = long, false = short)"
            ],
            "type": "bool"
          },
          {
            "name": "size",
            "docs": [
              "Size of the position in base asset units"
            ],
            "type": "u64"
          },
          {
            "name": "entryPrice",
            "docs": [
              "Entry price of the position"
            ],
            "type": "u64"
          },
          {
            "name": "collateral",
            "docs": [
              "Collateral amount in quote asset units (e.g., USDC)"
            ],
            "type": "u64"
          },
          {
            "name": "leverage",
            "docs": [
              "Leverage used for this position"
            ],
            "type": "u8"
          },
          {
            "name": "openedAt",
            "docs": [
              "Timestamp when position was opened"
            ],
            "type": "i64"
          },
          {
            "name": "lastFundingTs",
            "docs": [
              "Last funding payment timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "realizedPnlFromFunding",
            "docs": [
              "Realized PnL from funding payments"
            ],
            "type": "i64"
          },
          {
            "name": "liquidationPrice",
            "docs": [
              "Liquidation price"
            ],
            "type": "u64"
          },
          {
            "name": "isClosed",
            "docs": [
              "Whether position is closed"
            ],
            "type": "bool"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "user",
      "docs": [
        "User account to track user's collateral and positions"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "User public key"
            ],
            "type": "publicKey"
          },
          {
            "name": "collateralBalance",
            "docs": [
              "Collateral balance in quote asset units (e.g., USDC)"
            ],
            "type": "u64"
          },
          {
            "name": "openPositions",
            "docs": [
              "Number of open positions"
            ],
            "type": "u8"
          },
          {
            "name": "realizedPnl",
            "docs": [
              "Total realized PnL"
            ],
            "type": "i64"
          },
          {
            "name": "positions",
            "docs": [
              "Array of position pubkeys (fixed size to avoid stack issues)"
            ],
            "type": {
              "array": [
                "publicKey",
                10
              ]
            }
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vault",
      "docs": [
        "Vault account to store user collateral"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Mint of the token (e.g., USDC mint)"
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "Authority of the vault (program PDA)"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "docs": [
              "Token account owned by the vault authority"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalDeposits",
            "docs": [
              "Total deposits in the vault"
            ],
            "type": "u64"
          },
          {
            "name": "collateralType",
            "docs": [
              "Type of collateral stored in this vault"
            ],
            "type": "u8"
          },
          {
            "name": "oracle",
            "docs": [
              "Oracle account for price feed (for non-stablecoin collateral)"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracleType",
            "docs": [
              "Oracle type (0 = Pyth, 1 = Switchboard)"
            ],
            "type": "u8"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          },
          {
            "name": "authorityBump",
            "docs": [
              "Bump seed for vault authority PDA"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "feeVault",
      "docs": [
        "Fee vault to collect protocol fees"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Mint of the fee token (e.g., USDC mint)"
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "Authority that can withdraw fees"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "docs": [
              "Token account owned by the vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalFees",
            "docs": [
              "Total fees collected"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation"
            ],
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "OrderType",
      "docs": [
        "Order types supported by the protocol"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Market"
          },
          {
            "name": "Limit"
          },
          {
            "name": "StopLoss"
          },
          {
            "name": "TakeProfit"
          }
        ]
      }
    },
    {
      "name": "CollateralType",
      "docs": [
        "Collateral types supported by the protocol"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "USDC"
          },
          {
            "name": "SOL"
          }
        ]
      }
    },
    {
      "name": "OracleType",
      "docs": [
        "Oracle type enum"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Pyth"
          },
          {
            "name": "Switchboard"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "PositionClosedEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "market",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "exitPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "pnl",
          "type": "i64",
          "index": false
        },
        {
          "name": "fee",
          "type": "u64",
          "index": false
        },
        {
          "name": "returnAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "CollateralDepositedEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "GlobalStateInitializedEvent",
      "fields": [
        {
          "name": "admin",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "protocolFeeBps",
          "type": "u16",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "PositionLiquidatedEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "market",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidationPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "pnl",
          "type": "i64",
          "index": false
        },
        {
          "name": "liquidationFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "userReturn",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "PositionOpenedEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "market",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "isLong",
          "type": "bool",
          "index": false
        },
        {
          "name": "size",
          "type": "u64",
          "index": false
        },
        {
          "name": "collateral",
          "type": "u64",
          "index": false
        },
        {
          "name": "entryPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "leverage",
          "type": "u8",
          "index": false
        },
        {
          "name": "liquidationPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "FundingUpdatedEvent",
      "fields": [
        {
          "name": "market",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "fundingRate",
          "type": "i64",
          "index": false
        },
        {
          "name": "longSize",
          "type": "u64",
          "index": false
        },
        {
          "name": "shortSize",
          "type": "u64",
          "index": false
        },
        {
          "name": "skewPercentage",
          "type": "i64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "CollateralWithdrawnEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Overflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6001,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6002,
      "name": "Unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6003,
      "name": "OracleError",
      "msg": "Oracle error"
    },
    {
      "code": 6004,
      "name": "InvalidLeverage",
      "msg": "Invalid leverage"
    },
    {
      "code": 6005,
      "name": "InvalidMarginRatio",
      "msg": "Invalid margin ratio"
    },
    {
      "code": 6006,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6007,
      "name": "PositionClosed",
      "msg": "Position is already closed"
    },
    {
      "code": 6008,
      "name": "CannotLiquidate",
      "msg": "Position cannot be liquidated at current price"
    },
    {
      "code": 6009,
      "name": "InvalidPrice",
      "msg": "Invalid price from oracle"
    },
    {
      "code": 6010,
      "name": "BumpNotFound",
      "msg": "Bump seed not found"
    },
    {
      "code": 6011,
      "name": "InvalidSignature",
      "msg": "Invalid signature"
    },
    {
      "code": 6012,
      "name": "PriceDeviationTooLarge",
      "msg": "Price deviation from oracle is too large"
    },
    {
      "code": 6013,
      "name": "InvalidFundingRate",
      "msg": "Invalid funding rate"
    },
    {
      "code": 6014,
      "name": "InvalidMint",
      "msg": "Invalid mint"
    },
    {
      "code": 6015,
      "name": "InvalidAdminKey",
      "msg": "Invalid admin key"
    },
    {
      "code": 6016,
      "name": "InsufficientCollateral",
      "msg": "Insufficient collateral for margin requirements"
    },
    {
      "code": 6017,
      "name": "ProtocolPaused",
      "msg": "Protocol is paused"
    },
    {
      "code": 6018,
      "name": "MaxPositionsReached",
      "msg": "Maximum positions per user reached"
    },
    {
      "code": 6019,
      "name": "PositionTooSmall",
      "msg": "Position size too small"
    },
    {
      "code": 6020,
      "name": "MarketNotFound",
      "msg": "Market not found"
    },
    {
      "code": 6021,
      "name": "UserNotFound",
      "msg": "User account not found"
    },
    {
      "code": 6022,
      "name": "InvalidSlippage",
      "msg": "Invalid slippage tolerance"
    },
    {
      "code": 6023,
      "name": "SlippageTooHigh",
      "msg": "Price slippage too high"
    },
    {
      "code": 6024,
      "name": "MarketInactive",
      "msg": "Market is not active"
    },
    {
      "code": 6025,
      "name": "InvalidOracle",
      "msg": "Invalid oracle account"
    },
    {
      "code": 6026,
      "name": "FundingUpdateTooSoon",
      "msg": "Funding rate update too soon"
    },
    {
      "code": 6027,
      "name": "InvalidDirection",
      "msg": "Invalid position direction"
    },
    {
      "code": 6028,
      "name": "InvalidPriceInput",
      "msg": "Invalid price"
    },
    {
      "code": 6029,
      "name": "StaleOraclePrice",
      "msg": "Oracle price is stale"
    },
    {
      "code": 6030,
      "name": "InvalidOraclePrice",
      "msg": "Invalid oracle price"
    },
    {
      "code": 6031,
      "name": "InsufficientLiquidity",
      "msg": "Insufficient liquidity"
    },
    {
      "code": 6032,
      "name": "UnsupportedCollateral",
      "msg": "Unsupported collateral type"
    },
    {
      "code": 6033,
      "name": "InvalidOrderType",
      "msg": "Invalid order type"
    },
    {
      "code": 6034,
      "name": "InvalidPriceImpact",
      "msg": "Invalid price impact parameters"
    },
    {
      "code": 6035,
      "name": "PriceImpactTooHigh",
      "msg": "Price impact exceeds maximum allowed"
    },
    {
      "code": 6036,
      "name": "ReservesBelowMinimum",
      "msg": "AMM reserves below minimum threshold"
    },
    {
      "code": 6037,
      "name": "OracleDeviationTooHigh",
      "msg": "Oracle price deviation exceeds maximum allowed"
    },
    {
      "code": 6038,
      "name": "InvalidAmmParameter",
      "msg": "Invalid AMM parameter"
    },
    {
      "code": 6039,
      "name": "InvalidOracleType",
      "msg": "Invalid oracle type"
    },
    {
      "code": 6040,
      "name": "PriceTooHigh",
      "msg": "Price is too high"
    },
    {
      "code": 6041,
      "name": "PriceTooLow",
      "msg": "Price is too low"
    }
  ]
};
