# BigchainDB Express Boilerplate

## Directory Layout

```bash
.
├── /dist/                                  # The compiled output (via Babel)
├── /src/                                   # Node.js application source files
│   ├── /abstracts                          # Abstract classes
│   │   └── /AbstractRouter.js              # Abstract Router that new routers can extend
│   ├── /bin                                # For scripts and entrypoints
│   │   └── /www.js                         # Node.js server (entry point)
│   ├── /configs                            # JSON/YAML configs
│   │   ├── /asset.config.json              # BigchainDB Asset config
│   │   ├── /bigchaindb.config.json         # BigchainDB Server config
│   │   ├── /httperror.config.json          # Http Error codes with client messages
│   │   └── /logger.config.json             # Logger(Winston) config
│   ├── /handlers                           # Error Handlers, Data Handlers and Middlewares
│   │   └── /ErrorHandler.js                # Basic express error handler
│   ├── /routers                            # Application routers
│   │   └── /AssetCRABRouter.js             # Basic BigchainDB CRAB router extending AbstractRouter
│   ├── /services/                          # Data services and other shared utilities
│   │   ├── /CRABServices.js                # Basic BigchainDB CRAB services
│   │   ├── /LoggerService.js               # Logger(winston) service
│   │   └── /ORMService.js                  # BigchainDB ORM services setup
│   └── /App.js                             # Express.js application
└── package.json                            # List of project dependencies
```