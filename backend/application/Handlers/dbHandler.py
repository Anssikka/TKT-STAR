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

    def post_video(self, db, json):
        url = json.get('url')
        title = json.get('title')

        rec = Recommendation()
        video = Video(url=url, title=title, recommendation=rec)

        db.session.add(rec)
        db.session.add(video)
        db.session.commit()

        db.session.refresh(rec)

        if json.get('tags'):
            for tag in json.get('tags'):
                self.add_tag(rec, db, tag)

        return jsonify(video = video.serialize)

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

        db.session.refresh(rec)

        if json.get('tags'):
            for tag in json.get('tags'):
                self.add_tag(rec, db, tag)


        return jsonify(book=book.serialize)

    def update_book(self, db, book_id):
        book = db.session.query(Book).filter(Book.id == book_id).one()
        print(book.serialize)
        if book.isRead == False:
            book.isRead = True
        elif book.isRead == True:
            book.isRead = False

        print(book.serialize)
        db.session.commit()
        book = Book.query.get(book_id)
        print(book.serialize)
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