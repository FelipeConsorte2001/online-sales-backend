import { userEntityMock } from 'src/user/__mock__/user.mock';
import { LoginDto } from '../dtos/login.dto';

export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: 'abc',
};
