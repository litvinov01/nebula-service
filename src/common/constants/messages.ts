export const ERROR_MESSAGE = {
  badRequest: 'Bad request!',
  notFound: (instanceName: string) => `${instanceName} was not found!`,
};

export const SUCCESS_MESSAGES = {
  instanceChanged: (instanceName: string, operationType: string) =>
    `${instanceName} was successfully ${operationType}`,
};
