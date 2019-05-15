import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWorkspaceComponent } from './auth-workspace.component';

describe('AuthWorkspaceComponent', () => {
  let component: AuthWorkspaceComponent;
  let fixture: ComponentFixture<AuthWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
