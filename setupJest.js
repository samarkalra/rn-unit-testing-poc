import jestFetchMock from 'jest-fetch-mock';
jestFetchMock.enableMocks();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
