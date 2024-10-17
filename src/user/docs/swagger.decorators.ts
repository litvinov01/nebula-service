import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';
import { ERROR_MESSAGE, SUCCESS_MESSAGES } from '../../common';

export const COMMON_USER_DECORATORS = [
  ApiBadRequestResponse({
    schema: {
      example: { message: ERROR_MESSAGE.badRequest },
    },
  }),
];

export const CREATE_USER_DECORATORS = [
  ApiResponse({
    status: 201,
    schema: {
      example: {
        message: SUCCESS_MESSAGES.instanceChanged('User', 'created'),
        id: 1,
      },
    },
  }),
];
