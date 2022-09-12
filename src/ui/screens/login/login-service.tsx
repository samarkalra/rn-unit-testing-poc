import {AxiosResponse} from 'axios';
import axios from 'axios';

export type LoginRequest = {
  email: string;
  password: string;
};

type UserData = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

export type LoginResponse = {
  user_details: UserData;
};

type LoginService = (
  payload: LoginRequest,
) => Promise<AxiosResponse<LoginResponse>>;

export const onLogin: LoginService = async payload => {
  return await axios.post(
    'http://128.199.26.236/eeecrm/public/api/applogin',
    payload,
    {
      headers: {
        'X-CSRF-TOKEN': '5RaeYgyMFB5Iyzmmyg0f96oSRb200ClgdxuS7sDV',
      },
    },
  );
};
