import {mockResultResponse} from "../../src/shared/mocks/game.mocks";
import {peopleGameResponses, starshipGameResponses} from "./responses";

describe('Game setup', () => {

  it('Visits the initial game page', () => {
    cy.visit('/');
    cy.contains('CHOOSE YOUR RESOURCE');
  });

  it('should start the game and display proper board on starship button click', () => {
    cy.visit('/');
    const starshipsButton = cy.get('[data-tests="starships-button"]');
    starshipsButton.click();

    const resourceContainer = cy.get('[data-tests="resource-container"]');
    resourceContainer.should('contain', 'Player one:');
    resourceContainer.should('contain', 'Player two:');

    const cardContainer = cy.get('[data-tests="resource-container"]');
    cardContainer.should('contain', 'Starship Crew');
  });

  it('should start the game and display proper board on people button click', () => {
    cy.visit('/');
    const peopleButton = cy.get('[data-tests="people-button"]');
    peopleButton.click();

    const resourceContainer = cy.get('[data-tests="resource-container"]');
    resourceContainer.should('contain', 'Player one:');
    resourceContainer.should('contain', 'Player two:');

    const cardContainer = cy.get('[data-tests="resource-container"]');
    cardContainer.should('contain', 'Person Mass');
  });
});

describe('Gameplay', () => {

  it('should start the game with People Resource. Player One should have 1 point and Player Two have 2 points', () => {
    cy.intercept('GET', 'https://www.swapi.tech/api/people', {
      statusCode: 200,
      body: {
        ...mockResultResponse,
        results: [
          {uid: '1', url: 'http://localhost:8080/people/testUrl1', name: 'testName1'},
        ]
      },
    });

    let requestNo = 0;

    cy.intercept('get', 'http://localhost:8080/people/testUrl1', (req) => {
      req.reply(peopleGameResponses[requestNo++]);
    }).as('action');

    cy.visit('/');

    const peopleButton = cy.get('[data-tests="people-button"]');
    peopleButton.click();
    peopleButton.click();
    peopleButton.click();

    const cardContainer = cy.get('[data-tests="resource-container"]');
    cardContainer.should('contain', 'personTest1');
    cardContainer.should('contain', 'Person Mass: 100');
    cardContainer.should('contain', 'personTest2');
    cardContainer.should('contain', 'Person Mass: 200');
    cardContainer.should('contain', 'Round Winner: Player Two!');
    cardContainer.should('contain', 'Player one: 1 point');
    cardContainer.should('contain', 'Player two: 2 points');
  });

  it('should start the game with People Resource. Player One should have 0 points and Player Two have 1 point', () => {
    cy.intercept('GET', 'https://www.swapi.tech/api/starships', {
      statusCode: 200,
      body: {
        ...mockResultResponse,
        results: [
          {uid: '1', url: 'http://localhost:8080/starships/testUrl1', name: 'testName1'},
        ]
      },
    });

    let requestNo = 0;

    cy.intercept('get', 'http://localhost:8080/starships/testUrl1', (req) => {
      req.reply(starshipGameResponses[requestNo++]);
    }).as('action');

    cy.visit('/');

    const starshipButton = cy.get('[data-tests="starships-button"]');
    starshipButton.click();
    starshipButton.click();
    starshipButton.click();
    starshipButton.click();

    const cardContainer = cy.get('[data-tests="resource-container"]');
    cardContainer.should('contain', 'starshipTest1');
    cardContainer.should('contain', 'Starship Crew: 1');
    cardContainer.should('contain', 'starshipTest2');
    cardContainer.should('contain', 'Starship Crew: 1');
    cardContainer.should('contain', 'Round Draw');
    cardContainer.should('contain', 'Player one: 0 points');
    cardContainer.should('contain', 'Player two: 1 point');
  });
});
