import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDetailComponent } from './header-detail.component';

describe('HeaderDetailComponent', () => {
  let component: HeaderDetailComponent;
  let fixture: ComponentFixture<HeaderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HeaderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not be null or undefined', () => {
    expect(component).not.toBe(null);
    expect(component).not.toBe(undefined);
  });

});
