import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';
export const userEntityMock: UserEntity = {
  name: 'Jorge',
  phone: '15158161',
  email: 'some3@email.com.br',
  cpf: '123456',
  password: '$2b$10$S62WmVpIxL52Z.0y22DWfuaAz8.XUNESChWP.AlMFZnOJ9n9uiqi.',
  id: 4545,
  createdAt: new Date(),
  updateAt: new Date(),
  typeUser: UserType.User,
};
