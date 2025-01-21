import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';
export const UserEntityMock: UserEntity = {
  name: 'Jorge',
  phone: '15158161',
  email: 'some4@email.com.br',
  cpf: '123456',
  password: '4adsada44464',
  id: 4545,
  createdAt: new Date(),
  updateAt: new Date(),
  typeUser: UserType.User,
};
