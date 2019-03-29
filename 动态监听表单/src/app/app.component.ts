import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { LogicModel } from './models/logic.model';
import { Observable, of, combineLatest, interval } from 'rxjs';
import { logicData } from './data/logic.data';
import { ControlModel } from './models/control.model';
import { ActionEnum } from './models/action.enum';
import * as Collections from 'typescript-collections';
import { CombineMarkEnum } from './models/combine-mark.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userGroup: FormGroup;
  hobbies: FormArray;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userGroup = this.fb.group({
      'name': [''],
      'age': [''],
      'address': this.fb.group({
        'country': [''],
        'city': ['']
      }),
      'hobbies': this.fb.array([
        this.fb.control(false),
        this.fb.control(false),
      ])
    });

    this.hobbies = this.userGroup.get('hobbies') as FormArray;
    this.createLogic(logicData, this.userGroup);
    // console.log(this.userGroup.reset());
  }

  createLogic(logicDataList: LogicModel[], formGroup: FormGroup) {
    for (const data of logicDataList) {
      let source = formGroup.get(data.sourceControlList[0].controlPath).valueChanges;
      for (let i = 1; i < data.sourceControlList.length; i++) {
        const sc = data.sourceControlList[i];
        source = combineLatest(source, formGroup.get(sc.controlPath).valueChanges);
      }
      this.valueChangeListen(source, data, formGroup);
    }
  }

  valueChangeListen(sourceObserve: Observable<any>, data: LogicModel, formGroup: FormGroup) {
    const controlModelList = data.sourceControlList;
    const targetModelList = data.targetControlList;
    sourceObserve.subscribe((value: any[]) => {
      let isOk = true;
      const checkResult: boolean[] = [];
      for (let i = 0; i < controlModelList.length; i++) {
        checkResult.push(controlModelList[i].triggerValueRange.includes(value[i]));
      }
      const combineMark = controlModelList.map(c => c.combineMark);
      isOk = this.combineCheck(checkResult, combineMark);
      for (const targetControl of targetModelList) {
        if (isOk) {
          if (data.action === ActionEnum.DISABLE) {
            formGroup.get(targetControl.controlPath).disable();
          } else if (data.action === ActionEnum.RESET) {
            formGroup.get(targetControl.controlPath).reset();
          }
        } else {
          if (data.action === ActionEnum.DISABLE) {
            formGroup.get(targetControl.controlPath).enable();
          }
        }
      }
    });
  }

  combineCheck(checkResult: boolean[], combineMark: CombineMarkEnum[]) {
    if (combineMark === null || combineMark.length === 0) {
      return checkResult[0];
    }
    const stack: Collections.Stack<boolean> = new Collections.Stack();
    stack.push(checkResult[0]);
    let checkResultIndex = 1;
    for (let i = 0; i < combineMark.length; i++) {
      if (combineMark[i] === CombineMarkEnum.AND) {
        stack.push(stack.pop() && checkResult[checkResultIndex]);
      } else {
        checkResultIndex++;
        stack.push(checkResult[checkResultIndex]);
      }
      checkResultIndex++;
    }
    let result = false;
    for (let i = 0; i < stack.size(); i++) {
      if (stack.pop()) {
        result = true;
        break;
      }
    }
    return result;
  }
}
