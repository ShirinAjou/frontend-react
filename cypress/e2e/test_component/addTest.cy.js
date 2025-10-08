/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:5173/frontend-react/add')
  })

  it('displays two todo items by default', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('h1').should('have.text', "Skapa dokument")
  })

  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top')
  })

  it('.submit() - submit a form', () => {
    cy.intercept('/add', { id: 1, title: 'Dokument skapad' }).as('addRequest')
    cy.get('.form-container')
      .find('[type="text"]').type('Dokument skapad')
    cy.get('.form-container').submit()
    cy.wait('@addRequest')
    cy.url().should('include', '/frontend-react')
  })


  it('submit a form without title', () => {
    // https://on.cypress.io/submit
    cy.get('.form-container')
    cy.get('.btn-container').click()
    cy.should('be.visible')
    cy.url().should('include', '/add');
  })
})
