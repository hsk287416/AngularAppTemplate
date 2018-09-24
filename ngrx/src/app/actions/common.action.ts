import { BaseAction } from './base-action';
import { ModalContentModel } from '../models/modal-content.model';

export enum CommonActionEnum {
  START_LOAD = 'common/start_load',
  STOP_LOAD = 'common/stop_load',
  SHOW_MODAL = 'common/show_modal',
  CLOSE_MODAL = 'common/close_modal'
}

/**
 * 开始加载
 */
export class StartLoadAction implements BaseAction {
  readonly type: string = CommonActionEnum.START_LOAD;
}

/**
 * 停止加载
 */
export class StopLoadAction implements BaseAction {
  readonly type: string = CommonActionEnum.STOP_LOAD;
}

/**
 * 显示模态框
 */
export class ShowModalAction implements BaseAction {
  readonly type: string = CommonActionEnum.SHOW_MODAL;
  constructor(public payload: ModalContentModel){ }
}

/**
 * 关闭模态框
 */
export class CloseModalAction implements BaseAction {
  readonly type: string = CommonActionEnum.CLOSE_MODAL;
  constructor(public payload: boolean){}
}
