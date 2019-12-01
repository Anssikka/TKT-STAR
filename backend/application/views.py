
from application import app
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import cross_origin
from .Handlers.dbHandler import DBHandler

from .Models.models import Book

db = SQLAlchemy(app)

dbh = DBHandler


@app.route('/')
@app.route('/api/recommendations/books', methods=['GET', 'POST'])
@cross_origin()
def booksFunc():
    if request.method == 'GET':
        return dbh.get_books(app)
    elif request.method == 'POST':
        json = request.json
        return dbh.post_book(dbh, db, json)



# def get_books():
#     with app.app_context():
#         books = Book.query.all()
#         for book in books:
#             print((book.serialize))
#         return jsonify(books=[book.serialize for book in books])
