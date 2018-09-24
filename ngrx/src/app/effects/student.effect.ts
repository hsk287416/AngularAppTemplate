import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoadListAction, StudentActionEnum, ChangeListDataAction } from "../actions/student.action";
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.hmr";
import { Observable, of } from "rxjs";

@Injectable()
export class StudentEffect {

  @Effect()
  loadStudentList$: Observable<ChangeListDataAction> = this.actions$
    .pipe(
      ofType<LoadListAction>(StudentActionEnum.LOAD_LIST),
      exhaustMap((value, index) => {
        const resultObservable = this.httpClient.get(environment.baseUrl + '/student');
        return resultObservable.pipe(
          map((value, index) => {
            return new ChangeListDataAction(value['data']);
          }),
          catchError(error => of(new ChangeListDataAction([])))
        )
      })
    )

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient
  ){}
}
