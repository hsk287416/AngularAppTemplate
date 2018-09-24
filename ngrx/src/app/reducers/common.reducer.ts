import { CommonActionEnum } from '../actions/common.action';
import { BaseAction } from '../actions/base-action';
import { ModalContentModel } from '../models/modal-content.model';

export interface CommonState {
  loading: boolean;
  showModal: boolean;
  modalContent: ModalContentModel;
}

const initialState: CommonState = {
  loading: false,
  showModal: false,
  modalContent: {
    id: '',
    title: '',
    content: '',
    result: false
  }
}

export const commonReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case CommonActionEnum.START_LOAD:
      return {...state, loading: true};
    case CommonActionEnum.STOP_LOAD:
      return {...state, loading: false};
    case CommonActionEnum.SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        modalContent: action.payload
      }
    case CommonActionEnum.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        result: action.payload
      }
    default:
      return state;
  }
}
