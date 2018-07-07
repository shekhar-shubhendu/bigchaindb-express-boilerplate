# BigchainDB Express Boilerplate

## Directory Layout

```bash
.
├── /dist/                                  # The compiled output (via Babel)
├── /src/                                   # Node.js application source files
│   ├── /abstracts/                         # Abstract classes root
│   │   └── /AbstractRouter.js              # AbstractRouter that new routers can extend
│   ├── /bin/                               # For scripts and entrypoints
│   │   └── /www.js                         # Node.js server (entry point)
│   ├── /configs/                           # JSON/YAML configs
│   ├── /handlers/                          # Middlewares
│   ├── /routers/                           # Application routers
│   ├── /services/                          # Services and shared utilities
│   └── /App.js                             # Express.js application
└── package.json                            # List of project dependencies
```