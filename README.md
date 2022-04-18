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

3. run the app, `open a new command prompt`
   
   ```bash
   # build hardhat & external contracts types
   yarn contracts:build 
   # deploy your hardhat contracts
   yarn deploy
   # start vite 
   yarn start 
   ```