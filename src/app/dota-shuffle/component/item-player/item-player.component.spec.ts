import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPlayerComponent } from './item-player.component';

describe('ItemPlayerComponent', () => {
  let component: ItemPlayerComponent;
  let fixture: ComponentFixture<ItemPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemPlayerComponent]
    });
    fixture = TestBed.createComponent(ItemPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
