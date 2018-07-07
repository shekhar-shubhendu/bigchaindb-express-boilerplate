# BigchainDB Express Boilerplate

## Directory Layout

```bash
.
├── /dist/                                  # The compiled output (via Babel)
├── /src/                                   # Node.js application source files
│   ├── /abstracts/                         # Abstract classes root
│   │   └── /AbstractRouter.js              # AbstractRouter that new routers can extend without needing to redeclare deps
│   ├── /bin/                               # For scripts and entrypoints
│   │   └── /www.js                         # Node.js server (entry point)
│   ├── /configs/                           # JSON/YAML configs
│   ├── /handlers/                          # Middlewares
│   ├── /routers/                           # All the application router uses
│   ├── /services/                          # Services and shared utilities
│   └── /App.js                             # Express.js application
└── package.json                            # List of project dependencies
```