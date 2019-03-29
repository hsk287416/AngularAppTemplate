import { LogicModel } from '../models/logic.model';
import { ActionEnum } from '../models/action.enum';
import { CombineMarkEnum } from '../models/combine-mark.enum';

export const logicData: LogicModel[] = [
    {
        sourceControlList: [
            {
                controlPath: ['name'],
                triggerValueRange: ['1', '2'],
                combineMark: CombineMarkEnum.AND
            },
            {
                controlPath: ['age'],
                triggerValueRange: ['10', '11'],
            },
        ],
        targetControlList: [
            {
                controlPath: ['address', 'city']
            }
        ],
        action: ActionEnum.DISABLE
    },
    {
        sourceControlList: [
            {
                controlPath: ['address', 'country'],
                triggerValueRange: ['1', '2', '3']
            }
        ],
        targetControlList: [
            {
                controlPath: ['address', 'city']
            }
        ],
        action: ActionEnum.RESET
    }
];
