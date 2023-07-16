import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-employee-empty',
  templateUrl: './employee-empty.component.html',
  styleUrls: ['./employee-empty.component.css']
})
export class EmployeeEmptyComponent implements OnInit {

  notFoundMode: boolean = false;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        if(params.get('mode') === 'not-found')  {
          this.notFoundMode = true;
        }
      }
    );
  }
}
