import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserMock } from '../__mock__/createUser.mock';
import { UserEntityMock } from '../__mock__/user.mock';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(UserEntityMock),
            save: jest.fn().mockResolvedValue(UserEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });
  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(UserEntityMock.email);
    expect(user).toEqual(UserEntityMock);
  });

  it('should return erro findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findUserByEmail(UserEntityMock.email)).rejects.toThrow();
  });

  it('should return erro findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.findUserByEmail(UserEntityMock.email)).rejects.toThrow();
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(UserEntityMock.id);
    expect(user).toEqual(UserEntityMock);
  });

  it('should return erro findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findUserById(UserEntityMock.id)).rejects.toThrow();
  });

  it('should return erro findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.findUserById(UserEntityMock.id)).rejects.toThrow();
  });

  it('should return user in getUserByIdUsingReferences', async () => {
    const user = await service.getUserByIdUsingReferences(UserEntityMock.id);
    expect(user).toEqual(UserEntityMock);
  });

  it('should return error if user exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrow();
  });

  it('should user if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(undefined);
    const user = await service.createUser(createUserMock);
    expect(user).toEqual(UserEntityMock);
  });
});
