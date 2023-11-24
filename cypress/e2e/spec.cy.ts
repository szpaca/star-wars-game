describe('App', () => {
  it('visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Star Wars Game');
  });

  it('should have proper title', () => {
    cy.visit('/');
    cy.title().should('eq', 'Star Wars');
  });

  it('should display snack bar on failed request', () => {
    cy.visit('/');
    cy.intercept('**/api/**/*', {forceNetworkError: true}).as('failed');
    cy.wait('@failed').should('have.property', 'error');

    const cardContainer = cy.get('mat-snack-bar-container');
    cardContainer.should('contain', 'There is an error on our side. Try again later.');
  });
});
