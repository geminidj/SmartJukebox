import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackwarningComponent } from './playbackwarning.component';

describe('PlaybackwarningComponent', () => {
  let component: PlaybackwarningComponent;
  let fixture: ComponentFixture<PlaybackwarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaybackwarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaybackwarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
