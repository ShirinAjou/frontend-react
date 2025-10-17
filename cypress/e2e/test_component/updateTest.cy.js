/// <reference types="cypress" />

describe('Update-komponenten', () => {
  const id = '123';
  const baseUrl = 'https://shirinajou.github.io/frontend-react';
  beforeEach(() => {
    cy.intercept('GET', `/update/${id}`, {
      statusCode: 200,
      body: {
        title: 'Testtitel',
        content: 'Testinnehåll'
      }
    }).as('getDocument');

    cy.intercept('POST', '/update', {
      statusCode: 200,
      body: { id: id,
        title: 'Ny titel',
        content: 'Nytt innehåll' }
    }).as('postUpdate');

    cy.visit(`https://shirinajou.github.io/frontend-react/update/${id}`);  
  });

  it('visar befintlig titel och innehåll', () => {
    cy.wait('@getDocument');
    cy.get('input[name="title"]').should('have.value', 'Testtitel');
    cy.get('textarea[name="content"]').should('have.value', 'Testinnehåll');
  });

  it('uppdaterar dokumentet och skickar rätt data', () => {
    cy.get('input[name="title"]').clear().type('Ny titel');
    cy.get('textarea[name="content"]').clear().type('Nytt innehåll');
    cy.get('input[type="submit"]').click();

    cy.wait('@postUpdate').its('request.body').should('deep.include', {
      id: id,
      title: 'Ny titel',
      content: 'Nytt innehåll'
    });

    cy.url().should('equal', `${baseUrl}`);
  });
});
