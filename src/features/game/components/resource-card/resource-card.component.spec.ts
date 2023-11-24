import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ResourceCardComponent} from './resource-card.component';
import {mockPerson, mockStarship} from "../../../../shared/mocks/game.mocks";

describe('ResourceCardComponent', () => {
  let component: ResourceCardComponent;
  let fixture: ComponentFixture<ResourceCardComponent>;
  let card: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResourceCardComponent);
    component = fixture.componentInstance;
    card = fixture.debugElement.nativeElement.querySelector('mat-card')!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Person card text', () => {
    component.person = mockPerson;
    fixture.detectChanges();

    expect(card.textContent).toEqual('personTestNamePerson Mass: 100');
  });

  it('should render Starship card text', () => {
    component.starship = mockStarship;
    fixture.detectChanges();

    expect(card.textContent).toEqual('starshipTestNameStarship Crew: 100');
  });

  it('should render spinner', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.nativeElement.querySelector('mat-spinner')!;
    expect(spinner).toBeTruthy();
  });

  it('should not render spinner', () => {
    component.loading = false;
    fixture.detectChanges();

    const spinner = fixture.debugElement.nativeElement.querySelector('mat-spinner')!;
    expect(spinner).toBeFalsy();
  });
});
