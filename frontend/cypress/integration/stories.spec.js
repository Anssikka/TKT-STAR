const baseUrl = 'http://localhost:5000'

describe('As a user, I can', function () {
  beforeEach(function () {
    resetDatabase()
    cy.visit(`${baseUrl}`)
  })

  afterEach(function () {
    resetDatabase()
  })

  it('add blogs', function () {
    addBlogViaForm('BlogTitle', 'BlogUrl', 'Bloggername', ['tag3', 'tag2'])

    cy.contains('BlogTitle')
    cy.contains('BlogUrl')
    cy.contains('Bloggername')
    cy.contains('tag3')
    cy.contains('tag2')
    cy.contains('Add A Blog').click()
    cy.contains('BlogTitle')
    cy.contains('BlogUrl')
    cy.contains('Bloggername')
    cy.contains('tag3')
    cy.contains('tag2')
    cy.visit(baseUrl)

  })

  it('filter out content based on type', function () {
    addBookViaForm('Title', 'Author', '23452334524', ['tag1', 'tag2'])

    addVideoViaForm('Videotitle', 'VideoUrl', ['tag1', 'tag3'])

    addBlogViaForm('BlogTitle', 'BlogUrl', 'Bloggername', ['tag3', 'tag2'])

    cy.contains('Add a Book').click()
    cy.contains('Title')
    cy.contains('Author')
    cy.contains('23452334524')
    cy.contains('tag1')
    cy.contains('tag2')
    cy.visit(baseUrl)
    cy.contains('Add a Video').click()
    cy.contains('Videotitle')
    cy.contains('VideoUrl')
    cy.contains('tag1')
    cy.contains('tag3')
    cy.visit(baseUrl)
    cy.contains('Add A Blog').click()
    cy.contains('BlogTitle')
    cy.contains('BlogUrl')
    cy.contains('Bloggername')
    cy.contains('tag3')
    cy.contains('tag2')
    cy.visit(baseUrl)

  })

  it('see all recommendations on one page', function () {
    addBookViaForm('Title', 'Author', '23452334524', ['tag1', 'tag2'])

    addVideoViaForm('Videotitle', 'VideoUrl', ['tag1', 'tag3'])

    addBlogViaForm('BlogTitle', 'BlogUrl', 'Bloggername', ['tag3', 'tag2'])


    cy.contains('Title')
    cy.contains('Author')
    cy.contains('23452334524')
    cy.contains('tag1')
    cy.contains('tag2')
    cy.contains('Videotitle')
    cy.contains('VideoUrl')
    cy.contains('tag1')
    cy.contains('tag3')
    cy.contains('BlogTitle')
    cy.contains('BlogUrl')
    cy.contains('Bloggername')
    cy.contains('tag3')
    cy.contains('tag2')
  })

  it('filter recommendations by tag', function () {
    addBookViaForm('Title', 'Author', '23452334524', ['tag1', 'tag2'])

    addVideoViaForm('Videotitle', 'VideoUrl', ['tag1', 'tag3'])

    addBlogViaForm('BlogTitle', 'BlogUrl', 'Bloggername', ['tag3', 'tag2'])

    cy.get('[data-testid=tag-to-find-button]').click()

    cy.get('[data-testid=tag-to-find]').type('tag1')
    cy.contains('Title')
    cy.contains('Author')
    cy.contains('23452334524')
    cy.contains('tag1')
    cy.contains('tag2')
    cy.contains('Videotitle')
    cy.contains('VideoUrl')
    cy.contains('tag1')
    cy.contains('tag3')
    cy.get('[data-testid=tag-to-find]').clear()
    
    cy.get('[data-testid=tag-to-find]').type('tag2')
    cy.contains('Title')
    cy.contains('Author')
    cy.contains('23452334524')
    cy.contains('tag1')
    cy.contains('tag2')
    cy.contains('BlogTitle')
    cy.contains('BlogUrl')
    cy.contains('Bloggername')
    cy.contains('tag3')
    cy.contains('tag2')
    cy.get('[data-testid=tag-to-find]').clear()

    cy.get('[data-testid=tag-to-find]').type('tag3')
    cy.contains('Videotitle')
    cy.contains('VideoUrl')
    cy.contains('tag1')
    cy.contains('tag3')
    cy.contains('BlogTitle')
    cy.contains('BlogUrl')
    cy.contains('Bloggername')
    cy.contains('tag3')
    cy.contains('tag2')
    cy.get('[data-testid=tag-to-find]').clear()
  })

})

const resetDatabase = () => {
  cy.request('POST', 'http://localhost:5000/api/reset_database')
}

const addBookViaForm = (title, author, isbn, tags) => {
  cy.contains('Add a Book').click()
  cy.get('[data-testid=add-book-title]').type(title)
  cy.get('[data-testid=add-book-author]').type(author)
  cy.get('[data-testid=add-book-isbn]').type(isbn)
  cy.get('[data-testid=add-book-tag]').type(tags.join(', '))
  cy.get('[data-testid=add-book-submit]').click()
  cy.visit(baseUrl)
}

const addVideoViaForm = (title, url, tags) => {
  cy.contains('Add a Video').click()
  cy.get('[data-testid=add-video-title]').type(title)
  cy.get('[data-testid=add-video-url]').type(url)
  cy.get('[data-testid=add-video-tag]').type(tags.join(', '))
  cy.get('[data-testid=add-video-submit]').click()
  cy.visit(baseUrl)
}

const addBlogViaForm = (title, url, blogger, tags) => {
  cy.contains('Add A Blog').click()
  cy.get('[data-testid=add-blog-title]').type(title)
  cy.get('[data-testid=add-blogger]').type(blogger)
  cy.get('[data-testid=add-blog-url]').type(url)
  cy.get('[data-testid=add-blog-tag]').type(tags.join(', '))
  cy.get('[data-testid=add-blog-submit]').click()
  cy.visit(baseUrl)
}