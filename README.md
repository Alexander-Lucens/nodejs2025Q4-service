# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker [Download & install Docker](https://hub.docker.com/)

## Downloading

``` sh
git clone {repository URL}
```

## Installing NPM modules

``` sh
npm install
```
## Create `.env` form `.env.example`

## Running application

``` sh
npm run docker:build
```

## Stop and delete image of application

``` sh
npm run docker:down
```

## To scan vulnarabilities 
``` sh
npm run scan
```

## Testing

-> After application running open new terminal and enter:

To run all test for authorization
``` sh
npm run test:auth
```
To run only specific test suite with authorization
``` sh
npm run test:auth -- <path to suite>
```
To run all test for refresh
``` sh
npm run test:refresh
```

### Auto-fix and format
``` sh
npm run lint
```
``` sh
npm run format
```
