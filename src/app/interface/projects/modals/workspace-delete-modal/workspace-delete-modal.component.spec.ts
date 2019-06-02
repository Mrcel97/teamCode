import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceDeleteModalComponent } from './workspace-delete-modal.component';

describe('WorkspaceDeleteModalComponent', () => {
  let component: WorkspaceDeleteModalComponent;
  let fixture: ComponentFixture<WorkspaceDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
