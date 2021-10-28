import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be unchecked when `checked` is false', () => {
    component.checked = false;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.checkbox__rect'));
    const classes = Object.keys(element.classes);

    expect(classes).not.toContain('checkbox__rect--checked');
  });

  it('should be checked when `checked` is true', () => {
    component.checked = true;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.checkbox__rect'));

    expect(Object.keys(element.classes)).toContain('checkbox__rect--checked');
  });
});
