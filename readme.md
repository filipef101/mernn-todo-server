# MERRN Todo app server

This runs a [M]ongo and [E]xpress JS server

## Functionalities

Simple Authentication
Create / Delete | **Projects**
Create / Edit / Finish Delete | **Project Tasks**


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

 * NODE 10 +
 * yarn
 * A mongo database

### Installing


Create a .env file 

```
PORT=3000
MONGODB_CONNECTION_STRING='mongodb://localhost/todoListDB'
JWT_SECRET='mysecret'
```

Install dependencies

```
yarn install
```

Run in development mode with nodemon, reloading the server when files are changed
```
yarn start
```

## Deployment

run with node, ex
```
node .
```

## Built With

* Node 10
* Express JS 
* Mongose
* yarn

## Versioning

 [SemVer](http://semver.org/) is used for versioning. 
## Author

* **Filipe Fernandes** - [filipef101](https://github.com/filipef101)

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details
