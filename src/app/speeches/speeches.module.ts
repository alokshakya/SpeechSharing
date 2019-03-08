import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeechesRoutingModule } from './speeches-routing.module';
import { MySpeechesComponent } from './my-speeches/my-speeches.component';
import { NewSpeechComponent } from './new-speech/new-speech.component';
import { SearchSpeechesComponent } from './search-speeches/search-speeches.component';
import { SpeechHomeComponent } from './speech-home/speech-home.component';

@NgModule({
  declarations: [MySpeechesComponent, NewSpeechComponent, SearchSpeechesComponent, SpeechHomeComponent],
  imports: [
    CommonModule,
    SpeechesRoutingModule
  ]
})
export class SpeechesModule { }
