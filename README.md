# Node Shared Module

Tips and tricks cara membuat shared modules untuk digunakan antar service.

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

# Diference Topic And Queue Explained

- **Queue**: konsep kerja dari queue yaitu jika ada data yang masuk dan setelah data tersebut di konsume, maka data tersebut akan langsung dihapus kemudian akan dilanjut dengan data yang berikutnya, tetapi jika publisher nya mati maka data akan di baca kembali sesuai dengan urutan yang terakhir di konsume, selama datanya masih ada didalam queue.

- **Topic**: konsep kerja dari topic yaitu jika ada data yang masuk dan setelah data tersebut di konsume, maka data tersebut tidak akan langsung dihapus melainkan hanya dibaca saja kemudian akan dilanjut dengan data yang berikutnya, tetapi jika publisher nya mati maka data akan di baca kembali sesuai dengan urutan yang terakhir di konsume dan setelah selesai membaca data yang terakhir di konsume kemudian data akan dimulai dibaca kembali dari awal (offset 0).

# Authors Tutorial

**[Restu Wahyu Saputra](https://github.com/restuwahyu13)**