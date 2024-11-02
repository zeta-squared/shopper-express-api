# Shopper Express API
An [Express.js](https://expressjs.com/en) API backend built to support the [shopper](https://github.com/zeta-squared/shopper) React application.

## Installation
This API was developed in Node 18.19.1. To avoid any version errors ensure yours is on this release or above
by using `node -v`. If you are comfortable working on an older version you can go ahead and see all
requirements, and their version, in `./package.json`.

Once you have ensured your Node install is ready to use install all dependencies by running
```
npm i
```

Once all the dependencies are installed you need to configure the envionrment variables. Create the file `./config/.env`. The following configuration variables need to be set
```
EXPRESS_PORT=5000

ACCESS_TOKEN_DURATION=15
REFRESH_TOKEN_DURATION=7

SEQUELIZE_DIALECT='sqlite'
SEQUELIZE_DB_URI='sqlite://db/shopper.db'
SEQUELIZE_DB_PATH='/db/shopper.db'

DB_MODELS='/db/models'

SECRET_KEY='my secret key'
```
These are just default/dummy values I have included here. You are welcome to choose what you please.
>[!CAUTION]
>If you ever deploy this application make sure the `SECRET_KEY` is set to something secure. This can be done with the [UUID](https://github.com/uuidjs/uuid#readme) node package or another method of your preference.

Now use `npm start` to start the application. It will run, by default, on `localhost:5000`. You can optionally, change the port by using the `EXPRESS_PORT=<port>` variable in `./config/.env`. Documentation of all endpoints can be found at `localhost:<port>/`.
>[!NOTE]
>This applciation is not configured for production. If you wish to serve this application please make sure you
>follow [Express best practices](https://expressjs.com/en/advanced/best-practice-performance.html).

### Acknowledgements
The API uses several npm packages. I have listed the main ones here but for a complete list see
`./package.json`.
- [Ajv](https://www.ajv.js.org)
- [Sequelize](https://www.sequelize.org)
- [sequelize-typescript](https://www.github.com/sequelize/sequelize-typescript#readme)
- [hash-wasm](https://www.github.com/Daninet/hash-wasm#readme)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Swagger UI Express](https://www.github.com/scottie1984/swagger-ui-express)
- [Atlas](https://atlasgo.io/guides/orms/sequelize)

Apologies if I have left someones' work out.
