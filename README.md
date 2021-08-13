# Sydney Paranormal - Frontend

## Links

Deployed app: https://sydney-paranormal.netlify.app/

GitHub Repository: https://github.com/Nictordan/sydney-paranormal-client

## Local Setup Instructions

- Clone the `sydney-paranormal-client` repository.
- Run `yarn install`to install all of the required dependencies.
- Run `yarn start:local` to load the server.
- In the browser, load `http://localhost:3000` to run the app.

**Important**: The app uses Mapbox, an API for creating interactive maps. In order to load the map properly, it is necessary to obtain an API key from Mapbox; once you sign up a public key will be generated. In the React app, create a `.env` file in the root directory and insert the following line of code. 

```javascript
// make sure that there are no spaces between the = sign.
// do not include quotation marks around the API key.
REACT_APP_MAPBOX_KEY=your_api_key
```
---
For full details on the documentation, please refer to the README file at the root directory of this organization:
https://github.com/Nictordan/sydney-paranormal-client
