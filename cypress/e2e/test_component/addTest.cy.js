/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/frontend-react/add')
  })

  it('test h1 text content', () => {
    cy.get('h1').should('have.text', "Skapa dokument")
  })

  it('cy.window() - get the global window object', () => {
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
    cy.get('.form-container')
    cy.get('.btn-container').click()
    cy.should('be.visible')
    cy.url().should('include', '/add')
  })

  it('type in a value in title input', () => {
    cy.get('.action-content').type('Title')
    cy.get('.action-content').should('have.value', 'Title')
  })

  it('should have correct placeholders in form inputs', () => {
    cy.get('.form-container').within(() => {
      cy.get('input[name="title"]').first().should('exist')
      cy.get('textarea[name="content"]').last().should('exist')
    })
  })

  it('test submiting form via POST', () => {
    cy.intercept('POST', '**/add', { statusCode: 200, body: { success: true } }).as('postAdd')
    cy.get('input[name="title"]').type('Mitt testdokument')
    cy.get('textarea[name="content"]').type('Innehållet i testdokumentet')
    cy.get('.btn-container').click()

    cy.wait('@postAdd').should(({ request }) => {
      expect(request.body).to.have.property('title', 'Mitt testdokument')
      expect(request.body).to.have.property('content', 'Innehållet i testdokumentet')
      expect(request.headers).to.have.property('content-type').and.include('application/json')
    })
  })
})
