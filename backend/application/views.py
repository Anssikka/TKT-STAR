
import os
from application import app
from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import cross_origin

from .Models.models import Book

db = SQLAlchemy(app)

@app.route('/', defaults={'path':''})
@app.route('/<path:path>')
def home(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/recommendations/books', methods=['GET', 'POST'])
@cross_origin()
def booksFunc():
    if request.method == 'GET':
        return get_books()
    elif request.method == 'POST':
        data = request.json
        title = data.get('title')
        author = data.get('author')
        isbn = data.get('isbn')
        tags = data.get('tags')

        book = Book(title=title, author=author, isbn=isbn, tags=tags)

        db.session.add(book)
        db.session.commit()
        
        return jsonify(book=book.serialize)


def get_books():
    with app.app_context():
        books = Book.query.all()
        for book in books:
            print((book.serialize))
        return jsonify(books=[book.serialize for book in books])
