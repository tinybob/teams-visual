import { Component, OnInit } from '@angular/core';
import { GroupUtils } from '../../services/group';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css'],
  providers: [GroupUtils]
})
export class GroupCardComponent implements OnInit {

  cardData$: any;

  constructor(
    private groupUtils: GroupUtils,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cardData$ = this.groupUtils.getGroup();
  }

  accessGroup(data: any) {
    this.router.navigate(['../team', data.id], {relativeTo: this.route});
  }

  joinGroup(data: any) {
    this.groupUtils.addToGroup(data.id).subscribe(
      next => {
        const res = next;
      },
      err => {
        console.error(err);
      }
    );
  }
}
