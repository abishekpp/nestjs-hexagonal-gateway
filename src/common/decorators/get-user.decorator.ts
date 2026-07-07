import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

type RequestUser = Record<string, unknown>;
type RequestWithUser = Request & {
  user?: RequestUser;
  raw?: {
    user?: RequestUser;
  };
};

export const GetReqContextUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): unknown => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user ?? request.raw?.user ?? {};

    const userWithIp: Record<string, unknown> = { ...user, ip: request.ip };
    return data ? userWithIp[data] : userWithIp;
  },
);
