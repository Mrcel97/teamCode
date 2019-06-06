import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeChatComponent } from './ide-chat.component';

describe('IdeChatComponent', () => {
  let component: IdeChatComponent;
  let fixture: ComponentFixture<IdeChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
