import { applyDecorators } from '@nestjs/common';

type TAnyDecorator = ClassDecorator | MethodDecorator | PropertyDecorator;

export const BaseDecoratorCompose =
  (commonDecorators: TAnyDecorator[] = []) =>
  (concreteDecorators: TAnyDecorator[] = []) =>
    applyDecorators(...commonDecorators, ...concreteDecorators);
