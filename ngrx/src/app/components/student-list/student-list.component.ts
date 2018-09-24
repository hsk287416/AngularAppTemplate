import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudentState } from '../../reducers/student.reducer';
import { Observable, Subject } from 'rxjs';
import { StudentModel } from '../../models/student.model';
import { LoadListAction } from '../../actions/student.action';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {

  studentList$: Observable<StudentModel[]>
  private destorySubject: Subject<any> = new Subject();

  constructor(
    private studentStore: Store<StudentState>
  ) {
    this.studentList$ = studentStore.select('student', 'list');
  }

  ngOnInit() {
    this.studentList$.pipe(takeUntil(this.destorySubject)).subscribe(value => {
      if (value.length === 0) {
        this.studentStore.dispatch(new LoadListAction());
      }
    })
  }

  ngOnDestroy(): void {
    this.destorySubject.next();
    this.destorySubject.complete();
  }

}
