const baseUrl = 'http://localhost:3000'

describe('Book Page', function() {
  beforeEach(function() {
    cy.visit(`${baseUrl}/recommendations/books`)
  })

  it('can be opened', function() {
    cy.contains('Book Recommendations')
  })

  it('can add a book', function() {
    cy.get('[data-testid=add-book-title]').type('My First Title')
    cy.get('[data-testid=add-book-author]').type('Tester')
    cy.get('[data-testid=add-book-isbn]').type('0-123456789')

    cy.get('[data-testid=add-book-submit]').click()

    cy.contains('My First Title')
    cy.contains('Tester')
    cy.contains('0-123456789')
  })

  // it('can mark a book as read', function() {

  // })
})
