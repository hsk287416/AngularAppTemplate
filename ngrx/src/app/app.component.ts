import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CommonState } from './reducers/common.reducer';
import uuid from 'uuid';
import { StartLoadAction, StopLoadAction, ShowModalAction, CloseModalAction } from './actions/common.action';
import { ModalContentModel } from './models/modal-content.model';
import { LoadListAction } from './actions/student.action';
import { StudentState } from './reducers/student.reducer';
import { StudentModel } from './models/student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  loadStatus$: Observable<boolean>;
  showModal$: Observable<boolean>;
  modalContent$: Observable<ModalContentModel>;
  studentList$: Observable<StudentModel[]>
  private randomModelId: string;

  constructor(
    private store: Store<CommonState>,
    private studentStore: Store<StudentState>
  ){
    this.loadStatus$ = store.select('common', 'loading');
    this.showModal$ = store.select('common', 'showModal');
    this.modalContent$ = store.select('common', 'modalContent');
    this.studentList$ = studentStore.select('student', 'list');
  }

  ngOnInit(): void {

  }

  starLoad() {
    this.store.dispatch(new StartLoadAction());
  }

  endLoad() {
    this.store.dispatch(new StopLoadAction());
  }

  onModalClose(result: boolean) {
    this.store.dispatch(new CloseModalAction(result));
  }

  loadStudentList(){
    this.store.dispatch(new LoadListAction());
  }

  showModal(){
    this.randomModelId = uuid();
    this.store.dispatch(new ShowModalAction({
      id: this.randomModelId,
      title: 'title01',
      content: 'content01'
    }))
  }
}
