import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoemaFormPage } from './poema-form.page';

describe('PoemaFormPage', () => {
  let component: PoemaFormPage;
  let fixture: ComponentFixture<PoemaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
