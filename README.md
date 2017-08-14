# CordovaSample

Sample Picture Pay applicaiton using Android and Cordova.

## Configuration

`assets/www/js/config.js` contains a configuration object which consists of the following information:

- **privateKey**: Private API key used for authentication
- **publicKey**: Public API key used for authentication
  - *NOTE: Once you have been provided an API key use your key instead of these defaults*
- **domain**: Domain name of the financial institution
- **origin**: Url used to initialize & reset iframe (app.js). Used to verify the origin of the messages (messaging.js)
- **ssoRequest**: JSON object used as the POST body content for the SSO request
  - *NOTE: FinancialInstitutionId must be updated to match the given domain*
- **apiUrl**: Url to Allied's API