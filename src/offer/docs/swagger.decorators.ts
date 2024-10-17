import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';
import { ERROR_MESSAGE, SUCCESS_MESSAGES } from '../../common';

export const COMMON_OFFERS_DECORATORS = [
  ApiBadRequestResponse({
    schema: {
      example: { message: ERROR_MESSAGE.badRequest },
    },
  }),
];

export const CREATE_OFFER_DECORATORS = [
  ApiResponse({
    status: 201,
    schema: {
      example: {
        message: SUCCESS_MESSAGES.instanceChanged('Offer', 'created'),
        id: 1,
      },
    },
  }),
];
