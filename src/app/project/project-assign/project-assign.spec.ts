import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAssign } from './project-assign';

describe('ProjectAssign', () => {
  let component: ProjectAssign;
  let fixture: ComponentFixture<ProjectAssign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAssign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectAssign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
