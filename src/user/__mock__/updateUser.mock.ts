import { UpdatePassowrdDTO } from '../dtos/updateUser.dto';

export const updatePasswordMock: UpdatePassowrdDTO = {
  lastPassword: 'abc',
  newPassword: 'abc123',
};
export const updatePasswordInvalidMock: UpdatePassowrdDTO = {
  lastPassword: 'abc123',
  newPassword: 'abc',
};
