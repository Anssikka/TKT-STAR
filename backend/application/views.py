
from application import app
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

from .Models.models import Book

db = SQLAlchemy(app)

@app.route('/')
@app.route('/api/books', methods=['GET', 'POST'])
def booksFunc():
    if request.method == 'GET':
        return get_books()
    elif request.method == 'POST':
        data = request.json
        title = data.get('title')
        author = data.get('author')
        isbn = data.get('isbn')
        tags = data.get('tags')

        db.session.add(Book(title=title, author=author, isbn=isbn, tags=tags))
        db.session.commit()
        return get_books()


def get_books():
    with app.app_context():
        books = Book.query.all()
        for book in books:
            print((book.serialize))
        return jsonify(books=[book.serialize for book in books])
