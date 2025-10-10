/// <reference types="cypress" />

describe('example to-do app', () => {
    const baseUrl = 'http://localhost:5173/frontend-react/';
    beforeEach(() => {
        cy.visit('http://localhost:5173/frontend-react/')
    })

    it('testing navigation', () => {
        cy.get('.nav-container>a').should('contain.text', 'Add') 
    })

    it('should load homepage', () => {
        cy.url().should('equal', `${baseUrl}`)
        cy.contains('Home')
    })
})
