from ..Models.models import Book, Video, Recommendation
from flask import Flask, jsonify


class DBHandlers():
    def get_books(self, app):
        with app.app_context():
            books = Book.query.all()
            return jsonify(books=[book.serialize for book in books])

    def get_videos(self, app):
        with app.app_context():
            videos = Video.query.all()
            return jsonify(videos=[video.serialize for video in videos])

    def post_video(self, db, json):
        url = json.get('url')
        title = json.get('title')

        rec = Recommendation()
        video = Video(url=url, title=title)
        db.session.add(rec)
        db.session.add(video)

        db.session.commit()


    def post_book(self, db, json):
        title = json.get('title')
        author = json.get('author')
        isbn = json.get('isbn')
        isRead = 0

        rec = Recommendation()
        book = Book(title=title, author=author, isbn=isbn, isRead=isRead, recommendation=rec)

        db.session.add(rec)
        db.session.add(book)

        db.session.commit()