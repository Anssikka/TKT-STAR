const baseUrl = 'http://localhost:3000'

describe('Home', function() {
  it('can be opened', function() {
    cy.visit(baseUrl)
    cy.contains('Front page')
  })
})
