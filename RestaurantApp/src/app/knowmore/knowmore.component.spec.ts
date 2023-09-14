import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowmoreComponent } from './knowmore.component';

describe('KnowmoreComponent', () => {
  let component: KnowmoreComponent;
  let fixture: ComponentFixture<KnowmoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnowmoreComponent]
    });
    fixture = TestBed.createComponent(KnowmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
