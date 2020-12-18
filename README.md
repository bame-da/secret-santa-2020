# secret-santa-2020
A secret santa in Daml.

## Project Structure

#. Folder `contracts` contains a Daml project with the Daml contracts for secret santa
#. Folder `scripts` contains a Daml project with Daml Scripts that can be used to drive the app using Daml REPL
#. Folder `ui` contains an NPM project for a React.js UI compatible with project:DABL or local testing

## Running Locally

### 1. Build Daml Contracts

Inside the `contracts` folder run:

```
daml build -o santa-0.0.2.dar
```

### 2. Starting the Sandbox

Inside the `contracts` folder run:

```
daml start
```

### 3. Building the UI

In the root directly, run the codegen using command

```
daml codegen js contracts/santa-0.0.2.dar -o ui/lib/daml
```

Then inside the `ui` directory, run

```
npm install
```

### 4. Run the the UI

In the `ui` directory, run

```
npm start
```

### 5. Start the REPL

In the `scripts` folder, run

```
daml repl .daml/dist/santa-scripts-0.0.1.dar -i santa-scripts --ledger-host localhost --ledger-port 6865
```

### 6. Initialize the secret santa

In the repl:

```
santa::_ <- init_sandbox
```

### 7. Use the app

1. Use the UI or the `sign_up ["Party1", "Party2", ...]` script in REPL to sign up users.
2. Use the `close_signups santa` and `match_elves santa` scripts to close signups and match elves. Note that the matching the script performs is non-random.
3. Use the UI or scripts to play Secret Santa
4. Once all pledges are resolved, tidy up using the script `tidy_up santa`

## Deploying to project:DABL

1. Deploy the smart contracts `contracts/santa-0.0.2.dar`
2. Create a production build of the UI by running `npm run build` in `ui`
3. Zip up the resulting `build` folder. Your zip should contain the folder itself, not just the contents.
4. Deploy the UI zip to DABL
5. With two users go through the `SecretSantaRegulationRequest` flow
6. Use the app through the resulting UI
7. Do matching, closing, tidying through the REPL or project:DABL Live Data view
