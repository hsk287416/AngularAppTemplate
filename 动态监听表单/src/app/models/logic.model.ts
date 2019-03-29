import { ControlModel } from './control.model';
import { ActionEnum } from './action.enum';

export interface LogicModel {
    sourceControlList: ControlModel[];
    targetControlList: ControlModel[];
    action: ActionEnum;
}
