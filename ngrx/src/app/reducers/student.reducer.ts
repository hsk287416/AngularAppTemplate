import { StudentModel } from "../models/student.model";
import { BaseAction } from '../actions/base-action';
import { StudentActionEnum } from "../actions/student.action";

export interface StudentState {
  list: StudentModel[];
}

const initialState: StudentState =  {
  list: []
}

export const studentReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case StudentActionEnum.CHANGE_LIST_DATA:
      return {
        ...state,
        list: action.payload
      };

    default:
      return state;
  }
}
