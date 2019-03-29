import { CombineMarkEnum } from './combine-mark.enum';

export interface ControlModel {
    controlPath: string[];
    triggerValueRange?: string[];
    combineMark?: CombineMarkEnum;
}
