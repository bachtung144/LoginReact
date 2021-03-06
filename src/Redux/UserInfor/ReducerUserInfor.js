import {ADD_PHONE, ADD_CALLINGCODE} from './ActionUserInfor';

const myState = {
  phoneNumber: '',
  CallingCode: '',
};

export default function User(state = myState, action) {
  switch (action.type) {
    case ADD_PHONE:
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
    case ADD_CALLINGCODE:
      return {
        ...state,
        CallingCode: action.CallingCode,
      };
    default:
      return state;
  }
}
