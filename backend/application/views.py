import os
from application import app
from flask import Flask, jsonify, request, Response,  send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import cross_origin
from .Handlers.dbHandler import DBHandler
import os

from .Models.models import Book

db = SQLAlchemy(app)

dbh = DBHandler


@app.route('/api/recommendations/', methods=['GET'])
@cross_origin()
def getRecommendations():
    return dbh.get_recommendations(dbh, app)


@app.route('/api/recommendations/tag/<tag>', methods=['GET'])
@cross_origin()
def getRecommendationsByTag(tag):
    return dbh.get_recommendations_by_tag(dbh, app, tag)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/recommendations/books', methods=['GET'])
@cross_origin()
def getBooks():
    return dbh.get_books(dbh, app)


@app.route('/api/recommendations/books/tag/<tag>', methods=['GET'])
@cross_origin()
def getBooksByTag(tag):
    return dbh.get_books_by_tag(dbh, app, tag)


@app.route('/api/recommendations/books', methods=['POST'])
@cross_origin()
def postBook():
    json = request.json
    return dbh.post_book(dbh, db, json)


@app.route('/api/recommendations/books/<book_id>', methods=['POST'])
def markAsRead(book_id):
    return dbh.update_book(dbh, db, book_id)


@app.route('/api/recommendations/books/<book_id>', methods=['GET'])
@cross_origin()
def getBook(book_id):
    return dbh.get_book(dbh, db, book_id)


@app.route('/api/recommendations/blogs', methods=['GET'])
@cross_origin()
def getBlogs():
    return dbh.get_blogs(dbh, app)


@app.route('/api/recommendations/blogs/tag/<tag>', methods=['GET'])
@cross_origin()
def getBlogsByTag(tag):
    return dbh.get_blogs_by_tag(dbh, app, tag)


@app.route('/api/recommendations/blogs', methods=['POST'])
@cross_origin()
def postBlog():
    json = request.json
    return dbh.post_blog(dbh, db, json)


@app.route('/api/recommendations/videos/<video_id>', methods=['GET'])
@cross_origin()
def getVideo(video_id):
    return dbh.get_video(dbh, db, video_id)


@app.route('/api/recommendations/videos', methods=['GET'])
@cross_origin()
def getVideos():
    return dbh.get_videos(dbh, app)


@app.route('/api/recommendations/videos/tag/<tag>', methods=['GET'])
@cross_origin()
def getVideosByTag(tag):
    return dbh.get_videos_by_tag(dbh, app, tag)


@app.route('/api/recommendations/videos', methods=['POST'])
@cross_origin()
def postVideo():
    json = request.json
    return dbh.post_video(dbh, db, json)


@app.route('/api/reset_database', methods=['POST'])
@cross_origin()
def reset_database():
    if os.environ['PYTHON_ENV'] == 'TEST':
        dbh.reset_database(dbh)
        return Response("", status=205)
    else:
        return Response("", status=403)
