import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordDialogComponent } from './discord-dialog.component';

describe('DiscordDialogComponent', () => {
  let component: DiscordDialogComponent;
  let fixture: ComponentFixture<DiscordDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscordDialogComponent]
    });
    fixture = TestBed.createComponent(DiscordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
