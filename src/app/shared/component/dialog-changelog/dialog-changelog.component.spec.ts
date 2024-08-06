import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangelogComponent } from './dialog-changelog.component';

describe('DialogChangelogComponent', () => {
  let component: DialogChangelogComponent;
  let fixture: ComponentFixture<DialogChangelogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogChangelogComponent]
    });
    fixture = TestBed.createComponent(DialogChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
