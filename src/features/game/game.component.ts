import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ResourceCardComponent} from "./components/resource-card/resource-card.component";
import {GameService} from "../../apis/game-service/game.service";
import {forkJoin, map, Observable, share, startWith, tap} from "rxjs";
import {RESOURCES, ROUND_RESULT} from "./models/resource";
import {PeopleDueler} from "./models/person";
import {StarshipDueler} from "./models/starship";
import {getCrewAmount, getRandomResultUrl} from "./utils/game-utils";
import {Result} from "../../shared/models/general.interface";
import {Score} from "./models/score";
import {ScoreComponent} from "./components/score/score.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ResourceCardComponent, ScoreComponent],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {

  $results: Observable<{ starshipsResults: Result[]; peopleResults: Result[] }>;
  $starshipDueler: Observable<StarshipDueler>;
  $peopleDuelers: Observable<PeopleDueler>;

  score: Score = {
    playerOne: 0,
    playerTwo: 0,
    roundResult: undefined
  };

  fightingResource: RESOURCES | undefined;
  RESOURCES = RESOURCES;

  private starshipsResults: Result[] = [];
  private peopleResults: Result[] = [];

  constructor(private readonly gameService: GameService) {
  }

  ngOnInit(): void {
    this.setResults();
  }

  setFightingResource(resource: RESOURCES): void {
    this.fightingResource = resource;
    if (resource === RESOURCES.PEOPLE) {
      this.$peopleDuelers = this.getPeopleDuelers();
    }
    if (resource === RESOURCES.STARSHIPS) {
      this.$starshipDueler = this.getStarshipDuelers();
    }
  }

  private getPeopleDuelers(): Observable<PeopleDueler> {
    return forkJoin({
      personOne: this.gameService.getOnePerson(getRandomResultUrl(this.peopleResults)),
      personTwo: this.gameService.getOnePerson(getRandomResultUrl(this.peopleResults))
    })
      .pipe(
        tap(({personOne, personTwo}) => this.countScore(Number(personOne.mass), Number(personTwo.mass))),
        map(data => ({data, isLoading: false})),
        share(),
        startWith({isLoading: true, data: null})
      );
  }

  private getStarshipDuelers(): Observable<StarshipDueler> {
    return forkJoin({
      starshipOne: this.gameService.getOneStarship(getRandomResultUrl(this.starshipsResults)),
      starshipTwo: this.gameService.getOneStarship(getRandomResultUrl(this.starshipsResults))
    })
      .pipe(
        tap(({
               starshipOne,
               starshipTwo
             }) => this.countScore(getCrewAmount(starshipOne.crew), getCrewAmount(starshipTwo.crew))),
        map(data => ({data, isLoading: false})),
        share(),
        startWith({isLoading: true, data: null}));
  }

  private setResults(): void {
    this.$results = forkJoin({
      starshipsResults: this.gameService.getStarshipResults(),
      peopleResults: this.gameService.getPeopleResults()
    }).pipe(
      share(),
      tap(({starshipsResults, peopleResults}) => {
        this.starshipsResults = starshipsResults;
        this.peopleResults = peopleResults;
      }));
  }

  private countScore(playerOneNum: number, playerTwoNum: number): void {
    if (playerOneNum > playerTwoNum) {
      this.score.playerOne = this.score.playerOne + 1;
      this.score.roundResult = ROUND_RESULT.PLAYER_ONE;
    } else if (playerOneNum < playerTwoNum) {
      this.score.playerTwo = this.score.playerTwo + 1;
      this.score.roundResult = ROUND_RESULT.PLAYER_TWO;
    } else {
      this.score.roundResult = ROUND_RESULT.DRAW;
    }
  }
}
