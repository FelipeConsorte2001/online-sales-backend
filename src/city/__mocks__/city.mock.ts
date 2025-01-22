import { stateMock } from 'src/state/__mocks__/state.mock';
import { CityEntity } from '../entity/city.entity';

export const cityMock: CityEntity = {
  id: 1,
  name: 'Acre',
  createdAt: new Date(),
  updateAt: new Date(),
  stateId: stateMock.id,
};
