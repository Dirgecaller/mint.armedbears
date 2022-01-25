1. Clear the current ContractABI.json and replace it with your contract's ABI.

2. Switch the test address to your contract's addres in App.js, and
change the cost accordingly.

3. Go to blockchainActions.js and switch networkId to 1 (main net), and put in your smart contract address on line 54.

4. Change package.json homepage to wherever you will be hosting the build folder (example: https://seanpen.github.io/build).

5. Build! type "yarn build" in cmd prompt that is in directory of the package.json. This will create a "build" file in the directory.

6. Put "build" file from the directory into static website repo (if you have one).

YOURE ALL DONE! let me know if you have any questions.

**If you want to start the minting page before building it (so you can edit it live), type "yarn start" in a cmd prompt
that is in the same directory as the package.json.