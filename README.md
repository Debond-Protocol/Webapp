# Debond front end

## Typescript

The directories used are:

```bash
packages/vite-app-ts/
packages/hardhat-ts/
```

## Quick Start

Running the app

1. install your dependencies

   ```bash
   yarn install
   ```

2. start a hardhat node

   ```bash
   yarn chain
   ```

3. get the contracts
   ```bash
   mkdir packages/hardhat-ts/contracts/src
   cd $_
   # clone the repo
   git clone --branch frontend https://github.com/Debond-Protocol/Debond-Bank.git
   git clone --branch front https://github.com/Debond-Protocol/Debond-Exchange.git
   ```
4. run the app, `open a new command prompt`
   
   ```bash
   # build hardhat & external contracts types
   yarn contracts:build 
   # deploy your hardhat contracts
   yarn deploy
   # start vite 
   yarn start 
   ```

5. deploy the app
   ```bash
   # login first to firebase
   firebase login
   # build project
   yarn build
   # deploy to firebase
   firebase deploy
   ```
