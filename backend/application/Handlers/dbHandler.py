from ..Models.models import Book, Video, Recommendation, Tag, TagRecommendation
from flask import Flask, jsonify


class DBHandler():
    def get_books(app):
        with app.app_context():
            books = Book.query.all()
            print(books)
            return jsonify(books=[book.serialize for book in books])

    def get_videos(app):
        with app.app_context():
            videos = Video.query.all()
            return jsonify(videos=[video.serialize for video in videos])

    def post_video(db, json):
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
        print(rec.id)
        db.session.add(book)
        db.session.commit()

        db.session.refresh(rec)
        print(rec.id)

        if json.get('tags'):
            for tag in json.get('tags'):
                self.add_tag(rec, db, tag)


        return jsonify(book=book.serialize)

    def add_tag(rec, db, tag):
        tagObject = Tag(name=tag)
        db.session.add(tagObject)
        db.session.commit()

        db.session.refresh(tagObject)

        tagRec = TagRecommendation(tag_id=tagObject.id, recommendation_id=rec.id)
        db.session.add(tagRec)
        db.session.commit()

#dsaodkoasd