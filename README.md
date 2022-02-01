# Image API

A simple API built with typescript that connects to [Pinata](https://pinata.cloud/) and pins images. API supports both REST and GraphQl endpoints.

### Prerequisites

- Node.js

## Built With

- TypeScript
- Graphql

## Getting Started

- `git clone git@github.com:AshakaE/image-api.git`
- `cd image-api`
- `Get API keys from` [Pinata](https://app.pinata.cloud/keys)
- `create a file in 'keys' in src/config and add API keys`
```js
export default {
    ApiKey: "yourApiKey",
    ApiSecret: "yourApiSecret",
};
```
- `npm install`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

[Docs](https://documenter.getpostman.com/view/13541794/UVeDtT1w)

## Test

```bash
# unit tests
$ npm run test
```

## 🤝 Contributing

Contributions, issues and, feature requests are welcome!

Feel free to check the [issues page](https://github.com/AshakaE/image-api/issues).

## Show your support

Give a ⭐️ if you like this project!

## Stay in touch

- Author - [Ashaka Egerega](https://github.com/AshakaE)
- Website - [AshakaE](https://ashakae.live/)
- LinkedIn: [AshakaE](https://www.linkedin.com/in/AshakaE/)

## License

[MIT licensed](LICENSE).
