import { Test, TestingModule } from '@nestjs/testing';
import { createUserMock } from '../__mock__/createUser.mock';
import { updatePasswordMock } from '../__mock__/updateUser.mock';
import { userEntityMock } from '../__mock__/user.mock';
import { ReturnUserDto } from '../dtos/returnUser.dto';
import { UserType } from '../enum/user-type.enum';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userEntityMock),
            getUserById: jest.fn().mockResolvedValue(userEntityMock),
            getAllUser: jest.fn().mockResolvedValue([userEntityMock]),
            updatePasswordUser: jest.fn().mockResolvedValue(userEntityMock),
            getInfoUser: jest.fn().mockResolvedValue(userEntityMock),
            getUserByIdUsingRelations: jest
              .fn()
              .mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await controller.createUser(createUserMock);
    expect(user).toEqual(userEntityMock);
  });

  it('should create a admin user', async () => {
    const spyOn = jest.spyOn(userService, 'createUser');
    const user = await controller.createUserAdmin(createUserMock);
    expect(user).toEqual(userEntityMock);
    expect(spyOn.mock.calls[0][1]).toEqual(UserType.Admin);
  });

  it('should return all user', async () => {
    const users = await controller.getAllUser();
    expect(users).toEqual([
      {
        id: userEntityMock.id,
        name: userEntityMock.name,
        email: userEntityMock.email,
        phone: userEntityMock.phone,
        cpf: userEntityMock.cpf,
      },
    ]);
  });

  it('should update passoword', async () => {
    const user = await controller.updatePasswordUser(
      updatePasswordMock,
      userEntityMock.id,
    );

    expect(user).toEqual(userEntityMock);
  });

  it('should return all user info', async () => {
    const user = await controller.getInfoUser(userEntityMock.id);

    expect(user).toEqual(new ReturnUserDto(userEntityMock));
  });
});
