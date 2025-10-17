/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://shirinajou.github.io/frontend-react/')
  })

  it('displays two todo items by default', () => {
    cy.get('h1').should('have.text', "Home")
  })

  it('cy.window() - get the global window object', () => {
    cy.window().should('have.property', 'top')
  })

  it('should render home page', () => {
    cy.visit('https://shirinajou.github.io/frontend-react/')
  })

  it('testing navigation', () => {
    cy.get('.nav-container>a').should('contain.text', 'Add') 
  })

  it('match root element html', () => {
    cy.root().should('match', 'html')
  })
})
