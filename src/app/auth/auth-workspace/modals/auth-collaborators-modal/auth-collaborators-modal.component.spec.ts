import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCollaboratorsModalComponent } from './auth-collaborators-modal.component';

describe('AuthCollaboratorsModalComponent', () => {
  let component: AuthCollaboratorsModalComponent;
  let fixture: ComponentFixture<AuthCollaboratorsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCollaboratorsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCollaboratorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
