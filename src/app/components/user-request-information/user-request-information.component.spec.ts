import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestInformationComponent } from './user-request-information.component';

describe('UserRequestInformationComponent', () => {
  let component: UserRequestInformationComponent;
  let fixture: ComponentFixture<UserRequestInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRequestInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
