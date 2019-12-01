from application import app
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import cross_origin
from .Handlers.dbHandler import DBHandler

from .Models.models import Book

db = SQLAlchemy(app)

dbh = DBHandler


@app.route('/')
@app.route('/api/recommendations/books', methods=['GET'])
@cross_origin()
def getBooks():
    return dbh.get_books(app)

@app.route('/')
@app.route('/api/recommendations/books', methods=['POST'])
@cross_origin()
def postBook():
    json = request.json
    return dbh.post_book(dbh, db, json)

@app.route('/')
@app.route('/api/recommendations/books/<book_id>', methods=['POST'])
def markAsRead(book_id):
    return dbh.update_book(dbh, db, book_id)

@app.route('/')
@app.route('/api/recommendations/books/<book_id>', methods=['GET'])
@cross_origin()
def get_Book(book_id):
    return dbh.get_book(dbh, db, book_id)

@app.route('/')
@app.route('/api/recommendations/videos', methods=['GET'])
@cross_origin()
def getVideos():
    return dbh.get_videos(app)

@app.route('/')
@app.route('/api/recommendations/videos', methods=['POST'])
@cross_origin()
def postVideo():
    json = request.json
    return dbh.post_video(dbh, db, json)

