import { Action } from "@ngrx/store";

/**
 * 所有Action的父类
 */
export interface BaseAction extends Action {
  type: string,
  payload?: any
}

