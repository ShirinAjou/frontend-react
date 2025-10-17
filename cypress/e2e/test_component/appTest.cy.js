/// <reference types="cypress" />

describe('example to-do app', () => {
    const baseUrl = 'https://shirinajou.github.io/frontend-react/';
    beforeEach(() => {
        cy.visit('https://shirinajou.github.io/frontend-react/')
    })

    it('testing navigation', () => {
        cy.get('.nav-container>a').should('contain.text', 'Add') 
    })

    it('should load homepage', () => {
        cy.url().should('equal', `${baseUrl}`)
        cy.contains('Home')
    })
})
