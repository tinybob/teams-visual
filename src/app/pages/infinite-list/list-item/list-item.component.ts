import { Component, Input } from '@angular/core';
import { ListItem } from '../../../services/group';
@Component({
  selector: 'infinite-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input() data!: ListItem;

}
