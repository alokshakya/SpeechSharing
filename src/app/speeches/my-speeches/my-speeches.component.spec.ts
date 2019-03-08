import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpeechesComponent } from './my-speeches.component';

describe('MySpeechesComponent', () => {
  let component: MySpeechesComponent;
  let fixture: ComponentFixture<MySpeechesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySpeechesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpeechesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
