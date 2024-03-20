import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAsanaComponent } from './delete-asana.component';

describe('DeleteAsanaComponent', () => {
  let component: DeleteAsanaComponent;
  let fixture: ComponentFixture<DeleteAsanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAsanaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAsanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
