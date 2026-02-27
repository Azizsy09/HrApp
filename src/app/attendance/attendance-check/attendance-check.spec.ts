import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCheck } from './attendance-check';

describe('AttendanceCheck', () => {
  let component: AttendanceCheck;
  let fixture: ComponentFixture<AttendanceCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceCheck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceCheck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
