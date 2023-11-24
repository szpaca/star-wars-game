import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Starship, StarshipResource} from "../../features/game/models/starship";
import {Person, PersonResource} from "../../features/game/models/person";
import {SWAPI} from "../apis";
import {GeneralResponse, Result, ResultResponse} from "../../shared/models/general.interface";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    @Inject(SWAPI) private swapi: string,
    private http: HttpClient
  ) {
  }

  getStarshipResults(): Observable<Result[]> {
    return this.http.get<ResultResponse>(`${this.swapi}/starships`).pipe(map(res => res.results));
  }

  getPeopleResults(): Observable<Result[]> {
    return this.http.get<ResultResponse>(`${this.swapi}/people`).pipe(map(res => res.results));
  }

  getOneStarship(url: string): Observable<Starship> {
    const starshipResource: Observable<StarshipResource> = this.http
      .get<GeneralResponse>(url)
      .pipe(map(res => res.result));
    return starshipResource.pipe(map(res => res.properties));
  }

  getOnePerson(url: string): Observable<Person> {
    const personResource: Observable<PersonResource> = this.http
      .get<GeneralResponse>(url)
      .pipe(map(res => res.result));
    return personResource.pipe(map(res => res.properties));
  }
}
