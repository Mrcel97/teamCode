import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAddCollaboratorModalComponent } from './auth-add-collaborator-modal.component';

describe('AuthAddCollaboratorModalComponent', () => {
  let component: AuthAddCollaboratorModalComponent;
  let fixture: ComponentFixture<AuthAddCollaboratorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthAddCollaboratorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAddCollaboratorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
