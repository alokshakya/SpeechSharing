import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MySpeechesComponent } from './my-speeches/my-speeches.component';
import { NewSpeechComponent } from './new-speech/new-speech.component';
import { SearchSpeechesComponent } from './search-speeches/search-speeches.component';
import { SpeechHomeComponent } from './speech-home/speech-home.component';

const routes: Routes = [

  {path:'speechHome', component: SpeechHomeComponent, children:[
    {path:'mySpeeches', component: MySpeechesComponent},
    {path:'newSpeech', component: NewSpeechComponent},
    {path:'searchSpeeches', component: SearchSpeechesComponent},
    {path:'', redirectTo:'mySpeeches', pathMatch:'full'}
  ]},
  {path:'', redirectTo:'speechHome', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeechesRoutingModule { }
