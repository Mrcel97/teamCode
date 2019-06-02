import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceCreateModalComponent } from './workspace-create-modal.component';

describe('WorkspaceCreateModalComponent', () => {
  let component: WorkspaceCreateModalComponent;
  let fixture: ComponentFixture<WorkspaceCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
