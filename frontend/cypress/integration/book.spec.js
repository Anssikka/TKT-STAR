const baseUrl = 'http://localhost:5000'

describe('Book Page', function() {
  beforeEach(function() {
    resetDatabase()
    cy.visit(`${baseUrl}/recommendations/books`)
  })

  afterEach(function() {
    resetDatabase()
  })

  it('can be opened', function() {
    cy.contains('Book Recommendations')
  })

  it('can add a book', function() {
    const title = 'My First Title'
    const author = 'Tester'
    const isbn = '0-123456789'
    addBookViaForm(title, author, isbn)

    cy.contains(title)
    cy.contains(author)
    cy.contains(isbn)
  })

  it('can mark a book as read', function() {
    const title = 'My Second Title'
    const author = 'Tester Two'
    const isbn = '9-876543210'
    addBookViaForm(title, author, isbn)

    cy.contains('Mark as read').click()
  })
})

const addBookViaForm = (title, author, isbn) => {
  cy.get('[data-testid=add-book-title]').type(title)
  cy.get('[data-testid=add-book-author]').type(author)
  cy.get('[data-testid=add-book-isbn]').type(isbn)
  cy.get('[data-testid=add-book-submit]').click()
}

const resetDatabase = () => {
  cy.request('POST', 'http://localhost:5000/api/reset_database')
}
