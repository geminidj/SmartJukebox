import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooldowntimerComponent } from './cooldowntimer.component';

describe('CooldowntimerComponent', () => {
  let component: CooldowntimerComponent;
  let fixture: ComponentFixture<CooldowntimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooldowntimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooldowntimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
