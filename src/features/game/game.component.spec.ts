import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GameComponent} from './game.component';
import {GameService} from "../../apis/game-service/game.service";
import {RESOURCES, ROUND_RESULT} from "./models/resource";
import {of} from "rxjs";
import {mockPerson, mockResults, mockStarship} from "../../shared/mocks/game.mocks";

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let starshipsButton: HTMLButtonElement;
  let peopleButton: HTMLButtonElement;
  let cardsContainer: HTMLElement;

  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj(
      'GameService',
      ['getStarshipResults', 'getPeopleResults', 'getOneStarship', 'getOnePerson']
    );

    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [{provide: GameService, useValue: gameServiceSpy}],
      teardown: {destroyAfterEach: true},
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    gameServiceSpy.getPeopleResults.and.returnValue(of(mockResults));
    gameServiceSpy.getStarshipResults.and.returnValue(of(mockResults));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set fightingResource to STARSHIPS on button click', () => {
    gameServiceSpy.getPeopleResults.and.returnValue(of(mockResults));
    gameServiceSpy.getStarshipResults.and.returnValue(of(mockResults));
    fixture.detectChanges();
    starshipsButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="starships-button"]');
    peopleButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="people-button"]');

    expect(component.fightingResource).toBe(undefined);

    starshipsButton.click();
    expect(component.fightingResource).toBe(RESOURCES.STARSHIPS);
  });

  it('should set fightingResource to PEOPLE on button click', () => {
    gameServiceSpy.getPeopleResults.and.returnValue(of(mockResults));
    gameServiceSpy.getStarshipResults.and.returnValue(of(mockResults));
    fixture.detectChanges();
    starshipsButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="starships-button"]');
    peopleButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="people-button"]');

    expect(component.fightingResource).toBe(undefined);

    peopleButton.click();
    expect(component.fightingResource).toBe(RESOURCES.PEOPLE);
  });

  it('should set roundResult to draw', () => {
    gameServiceSpy.getOnePerson.and.returnValue(of(mockPerson));
    gameServiceSpy.getOneStarship.and.returnValue(of(mockStarship));

    fixture.detectChanges();
    starshipsButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="starships-button"]');

    starshipsButton.click();
    fixture.detectChanges();

    expect(component.score.roundResult).toBe(ROUND_RESULT.DRAW);
  });

  it('should set roundResult to PLAYER TWO WINNER when people fighting and set correct card', () => {
    gameServiceSpy.getOnePerson.and.returnValue(of(mockPerson));
    gameServiceSpy.getOneStarship.and.returnValues(of(mockStarship), of({...mockStarship, crew: '200'}));

    fixture.detectChanges();
    starshipsButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="starships-button"]');

    starshipsButton.click();
    fixture.detectChanges();

    cardsContainer = fixture.debugElement.nativeElement.querySelector('[data-tests*="cards-container"]');

    expect(component.score.roundResult).toBe(ROUND_RESULT.PLAYER_TWO);
    expect(cardsContainer.textContent).toContain('starship');
  });


  it('should set roundResult to PLAYER ONE WINNER when people fighting and set correct card', () => {
    gameServiceSpy.getOnePerson.and.returnValue(of(mockPerson));
    gameServiceSpy.getOneStarship.and.returnValues(of(mockStarship), of({...mockStarship, crew: '50'}));

    fixture.detectChanges();
    starshipsButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="starships-button"]');

    starshipsButton.click();
    fixture.detectChanges();

    cardsContainer = fixture.debugElement.nativeElement.querySelector('[data-tests*="cards-container"]');

    expect(component.score.roundResult).toBe(ROUND_RESULT.PLAYER_ONE);
    expect(cardsContainer.textContent).toContain('starship');
  });


  it('should set roundResult to PLAYER TWO WINNER when starships fighting and set correct card', () => {
    gameServiceSpy.getOneStarship.and.returnValue(of(mockStarship));
    gameServiceSpy.getOnePerson.and.returnValues(of(mockPerson), of({...mockPerson, mass: '200'}));

    fixture.detectChanges();
    starshipsButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="people-button"]');

    starshipsButton.click();
    fixture.detectChanges();

    cardsContainer = fixture.debugElement.nativeElement.querySelector('[data-tests*="cards-container"]');

    expect(component.score.roundResult).toBe(ROUND_RESULT.PLAYER_TWO);
    expect(cardsContainer.textContent).toContain('person');
  });


  it('should set roundResult to PLAYER ONE WINNER when starships fighting and set correct card', () => {
    gameServiceSpy.getOneStarship.and.returnValue(of(mockStarship));
    gameServiceSpy.getOnePerson.and.returnValues(of(mockPerson), of({...mockPerson, mass: '50'}));

    fixture.detectChanges();
    starshipsButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="people-button"]');

    starshipsButton.click();
    fixture.detectChanges();

    cardsContainer = fixture.debugElement.nativeElement.querySelector('[data-tests*="cards-container"]');

    expect(component.score.roundResult).toBe(ROUND_RESULT.PLAYER_ONE);
    expect(cardsContainer.textContent).toContain('person');
  });
});
