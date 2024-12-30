import { LoginPayload } from 'src/auth/dtos/loginPayload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayload | undefined => {
  const authorizationSlipted = authorization.split('.');
  if (authorization.length < 3 || !authorizationSlipted[1]) return undefined;

  return JSON.parse(
    Buffer.from(authorizationSlipted[1], 'base64').toString('ascii'),
  );
};
