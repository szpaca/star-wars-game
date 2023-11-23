import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ResourceCardComponent} from "./components/resource-card/resource-card.component";
import {GameService} from "../../apis/game-service/game.service";
import {forkJoin, map, Observable, share, startWith, tap} from "rxjs";
import {RESOURCES, ROUND_RESULT} from "./models/resource";
import {Person} from "./models/person";
import {Starship} from "./models/starship";
import {getCrewAmount} from "./utils/game-utils";
import {Result} from "../../shared/models/general.interface";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ResourceCardComponent],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {

  gameService = inject(GameService);

  results: Observable<{ starshipsResults: Result[]; peopleResults: Result[] }>
  starshipsResults: Result[] = []
  peopleResults: Result[] = []

  score: { playerOne: number, playerTwo: number, roundResult: ROUND_RESULT | undefined } = {
    playerOne: 0,
    playerTwo: 0,
    roundResult: undefined
  }

  RESOURCES = RESOURCES;
  fightingResource: RESOURCES;

  starshipDuelers: Observable<{ data: [Starship, Starship]; isLoading: boolean; } | {
    isLoading: boolean;
    data: Starship[];
  }>
  personDuelers: Observable<{ data: [Person, Person]; isLoading: boolean; } | { isLoading: boolean; data: Person[]; }>

  ngOnInit() {
    this.setResults()
  }

  setFightingResource(resource: RESOURCES) {
    this.fightingResource = resource;
    this.starshipDuelers = this.getStarshipDuelers();
    this.personDuelers = this.getPersonDuelers();
  }

  private getPersonDuelers(): Observable<{ data: [Person, Person], isLoading: boolean } | {
    isLoading: boolean;
    data: Person[]
  }> {
    const randomPersonUrl = this.peopleResults[Math.floor(Math.random() * this.peopleResults.length)].url
    const randomPersonUrl2 = this.peopleResults[Math.floor(Math.random() * this.peopleResults.length)].url
    return forkJoin([this.gameService.getOnePerson(randomPersonUrl), this.gameService.getOnePerson(randomPersonUrl2)])
      .pipe(
        tap((data) => this.countScore(Number(data[0].mass), Number(data[1].mass))),
        map(data => ({data, isLoading: false})),
        startWith({isLoading: true, data: []}),
      )
  }

  private getStarshipDuelers(): Observable<{ data: [Starship, Starship], isLoading: boolean } | {
    isLoading: boolean;
    data: Starship[]
  }> {
    const randomStarshipUrl = this.starshipsResults[Math.floor(Math.random() * this.starshipsResults.length)].url
    const randomStarshipUrl2 = this.starshipsResults[Math.floor(Math.random() * this.starshipsResults.length)].url
    return forkJoin([this.gameService.getOneStarship(randomStarshipUrl), this.gameService.getOneStarship(randomStarshipUrl2)])
      .pipe(
        tap((data) => this.countScore(getCrewAmount(data[0].crew), getCrewAmount(data[1].crew))),
        map(data => ({data, isLoading: false})),
        startWith({isLoading: true, data: []}))
  }

  private setResults() {
    this.results = forkJoin({
      starshipsResults: this.gameService.getStarshipResults(),
      peopleResults: this.gameService.getPeopleResults()
    }).pipe(
      share(),
      tap(({starshipsResults, peopleResults}) => {
        this.starshipsResults = starshipsResults;
        this.peopleResults = peopleResults
      }))
  }

  private countScore(playerOneNum: number, playerTwoNum: number) {
    if (playerOneNum > playerTwoNum) {
      this.score.playerOne = this.score.playerOne + 1;
      this.score.roundResult = ROUND_RESULT.PLAYER_ONE;
    } else if (playerOneNum < playerTwoNum) {
      this.score.playerTwo = this.score.playerTwo + 1
      this.score.roundResult = ROUND_RESULT.PLAYER_TWO;
    } else {
      this.score.roundResult = ROUND_RESULT.DRAW;
    }
  }
}
