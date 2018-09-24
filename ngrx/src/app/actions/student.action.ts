import { BaseAction } from "./base-action";
import { StudentModel } from "../models/student.model";

export enum StudentActionEnum {
  LOAD_LIST = 'student/load_list',
  SHOW_DETAIL = 'student/show_detail',
  CHANGE_LIST_DATA = 'student/change_list_data',
  CHANGE_DETAIL_DATA = 'student/change_detail_data'
}

/**
 * 加载学生列表
 */
export class LoadListAction implements BaseAction {
  readonly type: string = StudentActionEnum.LOAD_LIST;
}

/**
 * 显示学生详细信息
 */
export class ShowDetailAction implements BaseAction {
  readonly type: string = StudentActionEnum.SHOW_DETAIL;
  /**
   * 构造函数
   * @param payload studentID（学生ID）
   */
  constructor(public payload: string){}
}

/**
 * 变更学生列表
 */
export class ChangeListDataAction implements BaseAction {
  readonly type: string = StudentActionEnum.CHANGE_LIST_DATA;
  /**
   * 构造函数
   * @param payload 学生列表
   */
  constructor(public payload: StudentModel[]){}
}

/**
 * 变更学生详细信息
 */
export class ChangeDetailDataAction implements BaseAction {
  readonly type: string = StudentActionEnum.CHANGE_DETAIL_DATA;
  /**
   * 构造函数
   * @param payload 学生对象
   */
  constructor(public payload: StudentModel){}
}

