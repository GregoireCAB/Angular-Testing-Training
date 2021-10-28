import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { TodoState } from 'src/app/stores/todo/todo.state';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [NgxsModule.forRoot()],
      providers: [{ provide: Store, useValue: storeSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
