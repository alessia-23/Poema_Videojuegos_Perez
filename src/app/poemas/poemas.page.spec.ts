import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoemasPage } from './poemas.page';

describe('PoemasPage', () => {
  let component: PoemasPage;
  let fixture: ComponentFixture<PoemasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
