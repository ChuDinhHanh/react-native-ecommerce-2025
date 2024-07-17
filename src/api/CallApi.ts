import axios from 'axios';
import {SERVER_ADDRESS} from '../constants/System';
import {UserRegister} from '../types/request/UserRegister';

export const createAccount = async (data: UserRegister) => {
  await axios
    .post(SERVER_ADDRESS + 'api/register', data)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

export const getUser = async () => {
  await axios
    .get('http://192.168.40.208:5181/api/users')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};
