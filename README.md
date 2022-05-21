# Node Shared Modules (On Progress)
Tips and tricks how to create shared modules between service


# Commands
```json
  "scripts": {
    "cleanup": "rimraf dist",
    "compiler": "tsc",
    "build": "npm run cleanup && npm run compiler",
    "pkg:build": "./node_modules/.bin/lerna run build",
    "fetch": "node ./dist/axios/index.js",
    "kafka:pub": "node ./dist/kafka/publisher.js",
    "kafka:sub": "node ./dist/kafka/subscriber.js",
    "rabbitmq:pub": "node ./dist/kafka/publisher.js",
    "rabbitmq:sub": "node ./dist/kafka/subscriber.js"
  }
```
