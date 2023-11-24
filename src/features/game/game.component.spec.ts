import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GameComponent} from './game.component';
import {GameService} from "../../apis/game-service/game.service";
import {RESOURCES, ROUND_RESULT} from "./models/resource";
import {of} from "rxjs";
import {mockPerson, mockResults, mockStarship} from "../../shared/mocks/game.mocks";


describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let playerOneButton: HTMLButtonElement;
  let playerTwoButton: HTMLButtonElement;

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
    playerOneButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-one-button"]');
    playerTwoButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-two-button"]');

    expect(component.fightingResource).toBe(undefined);

    playerOneButton.click();
    expect(component.fightingResource).toBe(RESOURCES.STARSHIPS);
  });

  it('should set fightingResource to PEOPLE on button click', () => {
    gameServiceSpy.getPeopleResults.and.returnValue(of(mockResults));
    gameServiceSpy.getStarshipResults.and.returnValue(of(mockResults));
    fixture.detectChanges();
    playerOneButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-one-button"]');
    playerTwoButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-two-button"]');

    expect(component.fightingResource).toBe(undefined);

    playerTwoButton.click();
    expect(component.fightingResource).toBe(RESOURCES.PEOPLE);
  });

  it('should set roundResult to draw', () => {
    gameServiceSpy.getOnePerson.and.returnValue(of(mockPerson));
    gameServiceSpy.getOneStarship.and.returnValue(of(mockStarship));

    fixture.detectChanges();
    playerOneButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-one-button"]');

    playerOneButton.click();
    fixture.detectChanges();

    expect(component.score.roundResult).toBe(ROUND_RESULT.DRAW);
  });

  it('should set roundResult to PLAYER TWO WINNER', () => {
    gameServiceSpy.getOnePerson.and.returnValue(of(mockPerson));
    gameServiceSpy.getOneStarship.and.returnValues(of(mockStarship), of({...mockStarship, crew: '200'}));

    fixture.detectChanges();
    playerOneButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-one-button"]');

    playerOneButton.click();
    fixture.detectChanges();

    expect(component.score.roundResult).toBe(ROUND_RESULT.PLAYER_TWO);
  });


  it('should set roundResult to PLAYER TWO WINNER', () => {
    gameServiceSpy.getOnePerson.and.returnValue(of(mockPerson));
    gameServiceSpy.getOneStarship.and.returnValues(of(mockStarship), of({...mockStarship, crew: '50'}));

    fixture.detectChanges();
    playerOneButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-one-button"]');

    playerOneButton.click();
    fixture.detectChanges();

    expect(component.score.roundResult).toBe(ROUND_RESULT.PLAYER_ONE);
  });


  it('should set roundResult to PLAYER TWO WINNER', () => {
    gameServiceSpy.getOneStarship.and.returnValue(of(mockStarship));
    gameServiceSpy.getOnePerson.and.returnValues(of(mockPerson), of({...mockPerson, mass: '200'}));

    fixture.detectChanges();
    playerOneButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-two-button"]');

    playerOneButton.click();
    fixture.detectChanges();

    expect(component.score.roundResult).toBe(ROUND_RESULT.PLAYER_TWO);
  });


  it('should set roundResult to PLAYER TWO WINNER', () => {
    gameServiceSpy.getOneStarship.and.returnValue(of(mockStarship));
    gameServiceSpy.getOnePerson.and.returnValues(of(mockPerson), of({...mockPerson, mass: '50'}));

    fixture.detectChanges();
    playerOneButton = fixture.debugElement.nativeElement.querySelector('[data-tests*="player-two-button"]');

    playerOneButton.click();
    fixture.detectChanges();

    expect(component.score.roundResult).toBe(ROUND_RESULT.PLAYER_ONE);
  });
});
