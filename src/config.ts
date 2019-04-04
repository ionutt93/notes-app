export const config = {
  s3: {
    REGION: 'eu-west-2',
    BUCKET: 'notes-2-04-2019'
  },
  apiGateway: {
    REGION: 'eu-west-2',
    URL: 'https://g68bah1cg8.execute-api.eu-west-2.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'eu-west-2',
    USER_POOL_ID: 'eu-west-2_ZPEbpmcV2',
    APP_CLIENT_ID: '4ldjdnprdlmm43sp4t04qnvvqq',
    IDENTITY_POOL_ID: 'eu-west-2:f486c062-b862-4db8-806f-a8fc43f75f34'
  },
  MAX_ATTACHMENT_SIZE: 5000000
};
