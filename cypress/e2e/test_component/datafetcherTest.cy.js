/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/frontend-react')
  })

  it('displays two todo items by default', () => {
    cy.get('h1').should('have.text', "Home")
  })

  it('test fetch request', () => {
    cy.intercept('GET', "https://jsramverk-shirin-hsfqftftd8b6d9fn.northeurope-01.azurewebsites.net/", { fixture: 'mockData.json' })
    cy.visit('http://localhost:5173/frontend-react')
    cy.get('table').should('contain', 'Document1')
  })

  it('test that åtgärd contains URL', () => {
    cy.get('table tbody tr').each((row) => {
      cy.wrap(row).find('a').should('have.attr', 'href').and('include', '/frontend-react/update/');
    });
  })
})
