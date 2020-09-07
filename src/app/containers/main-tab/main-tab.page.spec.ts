import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainTabPage } from './main-tab.page';

describe('MainTabPage', () => {
  let component: MainTabPage;
  let fixture: ComponentFixture<MainTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
