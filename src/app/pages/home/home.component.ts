import { Component, OnInit } from '@angular/core';
import { GroupUtils } from '../../services/group';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GroupUtils]
})
export class HomeComponent implements OnInit {

  title: any;
  allTeams: any;

  constructor(
    private groupUtils: GroupUtils
  ) { }

  ngOnInit(): void {
    this.title = 'app working';
    this.groupUtils.getAllTeams().subscribe(
      next => {
        this.allTeams = next;
      },
      err => {
        console.error(err);
      }
    );
  }

}
