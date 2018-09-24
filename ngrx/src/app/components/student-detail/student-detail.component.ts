import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  studentId: string;

  constructor(
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe(pms => {
      this.studentId = pms.id;
    })
  }

  ngOnInit() {
  }

}
