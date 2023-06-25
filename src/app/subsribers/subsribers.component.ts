import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subsribers',
  templateUrl: './subsribers.component.html',
  styleUrls: ['./subsribers.component.scss']
})
export class SubsribersComponent implements OnInit {

  subscribers!: any[];

  constructor( private subscribersService: SubscribersService ){}

  onDelete(id: any){
    this.subscribersService.deleteSubs(id);
  }

  ngOnInit(): void {
    this.subscribersService.LoadData().subscribe(subs => {
      this.subscribers = subs;
    })
  }

}
