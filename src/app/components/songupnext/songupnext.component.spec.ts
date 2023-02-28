import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongupnextComponent } from './songupnext.component';

describe('SongupnextComponent', () => {
  let component: SongupnextComponent;
  let fixture: ComponentFixture<SongupnextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongupnextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongupnextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
