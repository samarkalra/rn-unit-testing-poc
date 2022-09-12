import 'react-native';
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginScreen, {
  INVALID_PASSWORD_ERROR,
  INVALID_USERNAME_ERROR,
  LOGIN_BUTTON_TEST_ID,
  PASSWORD_INPUT_TEST_ID,
  USERNAME_INPUT_TEST_ID,
} from './LoginScreen';
import HomeScreen from '../home/HomeScreen';

describe('Login Screen', () => {
  it('renders default elements', () => {
    const {getAllByText, getByPlaceholderText} = render(<LoginScreen />);

    expect(getAllByText('Login').length).toBe(2);
    getByPlaceholderText('Email');
    getByPlaceholderText('Password');
  });

  it('shows invalid input messages', () => {
    const {getByTestId, getByText} = render(<LoginScreen />);

    fireEvent.press(getByTestId(LOGIN_BUTTON_TEST_ID));

    getByText(INVALID_USERNAME_ERROR);
    getByText(INVALID_PASSWORD_ERROR);
  });

  it('shows invalid username error message', () => {
    const {getByTestId, getByText, queryAllByText} = render(<LoginScreen />);

    const usernameTextField = getByTestId(USERNAME_INPUT_TEST_ID);
    const passwordTextField = getByTestId(PASSWORD_INPUT_TEST_ID);

    fireEvent.changeText(usernameTextField, 'abcd');
    fireEvent.changeText(passwordTextField, 'test');
    fireEvent.press(getByTestId(LOGIN_BUTTON_TEST_ID));

    getByText(INVALID_USERNAME_ERROR);
    expect(queryAllByText(INVALID_PASSWORD_ERROR).length).toBe(0);
  });

  it('shows invalid password error message', () => {
    const {getByTestId, getByText, queryAllByText} = render(<LoginScreen />);

    const usernameTextField = getByTestId(USERNAME_INPUT_TEST_ID);
    const passwordTextField = getByTestId(PASSWORD_INPUT_TEST_ID);

    fireEvent.changeText(usernameTextField, 'test');
    fireEvent.changeText(passwordTextField, 'abcd');
    fireEvent.press(getByTestId(LOGIN_BUTTON_TEST_ID));

    getByText(INVALID_PASSWORD_ERROR);
    expect(queryAllByText(INVALID_USERNAME_ERROR).length).toBe(0);
  });

  it('handles valid input submission', () => {
    fetchMock.mockResponseOnce(JSON.stringify({passes: true}));

    const {getByTestId} = render(<LoginScreen />);

    const usernameTextField = getByTestId(USERNAME_INPUT_TEST_ID);
    const passwordTextField = getByTestId(PASSWORD_INPUT_TEST_ID);

    fireEvent.changeText(usernameTextField, 'test');
    fireEvent.changeText(passwordTextField, 'test');
    fireEvent.press(getByTestId(LOGIN_BUTTON_TEST_ID));
  });
});
