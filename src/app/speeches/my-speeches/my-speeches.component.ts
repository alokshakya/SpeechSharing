import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-my-speeches',
  templateUrl: './my-speeches.component.html',
  styleUrls: ['./my-speeches.component.css']
})
export class MySpeechesComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  speechData = {
    id:2,
    authorId:2,
    authorName:'Alok',
    keywords:['rally', 'election'],
    text:'This is testing text speech 2',
    createdDate:"2019-03-10T08:38:22.410Z",
    updatedDate:"2019-03-11T08:39:10.823Z"
  };
  loading:boolean=false;
  addMessage(){
    this.loading=true;
    this.dataService.addSpeech(this.speechData)
    .subscribe( (res) => {
      this.loading=false;
      console.log('response in console ');
      console.log(res);
    })
  }

}
