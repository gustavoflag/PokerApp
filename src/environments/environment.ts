// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //API_URI: "http://localhost:9000/.netlify/functions/server",
  //API_URI: "http://localhost:3000",
  //API_RELOGIO_URI: "http://localhost:3000",
  //API_AUTH: "http://localhost:3000",
  API_URI: "https://tqsop2024-api.netlify.app/.netlify/functions/server",
  API_RELOGIO_URI: "https://poker-clock-api{index}.netlify.app/.netlify/functions",
  API_AUTH_URI: "https://auth-service-api.netlify.app/.netlify/functions/server",
  theme: "slate"
};