# Gitback

## Clone the repo

`git clone https://github.com/venkatesh-rao/gitback.git`

## Make the code ready

`npm run bootstrap` (from the root folder of the repo)

## Steps prior running the code

### Apart from the code

- [Create a Github App](https://developer.github.com/apps/building-github-apps/creating-a-github-app/) \* **Generate** a private key for your Github App and **download** the key
- [Create an Github OAuth App](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)

### In the code

- Place you Github App private key in the `packages/api` directory
- Create an `.env` file in the `packages/api` directory
- Copy & paste this code (**remember to place your credentials**)

```
OAUTH_CLIENT_ID=<your_OAUTH_APP_client_id>
OAUTH_CLIENT_SECRET=<your_OAUTH_APP_client_secret>

APP_CLIENT_ID=<your_GITHUB_APP_client_id>
APP_CLIENT_SECRET=<your_GITHUB_APP_client_secret>
APP_ID=<your_GITHUB_APP_id>
PEM_FILE_NAME_WITH_EXTENSION=<your_GITHUB_APP_pem_file_name>

OAUTH_HOST=github.com
OAUTH_PATH=/login/oauth/access_token

ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>

CLIENT_HOST=http://localhost:3001
API_HOST=http://localhost:4000

MONGO_URL=<your_DB_url>
```

- Create another `.env` file in the `packages/web-app` directory
- Copy & paste this code (**remember to place your credentials**)

```
REACT_APP_GITHUB_OAUTH_CLIENT_ID=<your_OAUTH_APP_client_id>
REACT_APP_REDIRECT_URI=http://localhost:3001/login
REACT_APP_API_ENDPOINT=http://localhost:4000

REACT_APP_GITHUB_APP_NAME=<your_GITHUB_APP_name>
```

## Running the code

- _web-app will run on localhost:3001_
- _api will run on localhost:4000_ (if you use windows OS, please change the port of the api in `packages/api/src/index.ts`)

### Development

`npm run start:dev` (from the root folder of the repo)

### Production

`npm run start` (from the root folder of the repo)
