import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPagesComponent } from './project-pages.component';

describe('ProjectPagesComponent', () => {
  let component: ProjectPagesComponent;
  let fixture: ComponentFixture<ProjectPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
