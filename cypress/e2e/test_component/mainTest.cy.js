/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('displays two todo items by default', () => {
    cy.get('h1').should('have.text', "Home")
  })

  it('cy.window() - get the global window object', () => {
    cy.window().should('have.property', 'top')
  })

  it('testing page is rendering', () => {
    cy.visit('http://localhost:5173')
  })

  it('testing navigation', () => {
    cy.get('.nav-container>a').should('contain.text', 'Add') 
  })

  it('XX', () => {
    cy.root().should('match', 'html')
  })

  it('XX', () => {
    cy.get('[data-cy=submit]').click()
  })
})
