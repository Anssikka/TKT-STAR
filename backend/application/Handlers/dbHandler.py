from ..Models.models import Book, Video, Recommendation, Tag, TagRecommendation, Blog
from flask import Flask, jsonify, Response
from sqlalchemy import func

from application import app
from application import init_db, returnDB


class DBHandler():
    def get_recommendations(self, app):
        with app.app_context():
            books = Book.query.all()
            videos = Video.query.all()
            blogs = Blog.query.all()

            dict = {
                "book": [book.serialize for book in books],
                "video": [video.serialize for video in videos],
                "blog": [blog.serialize for blog in blogs]
            }
            return jsonify(dict)

    def get_recommendations_by_tag(self, app, tag):
        books = self.get_books_by_tag(self, app, tag)
        videos = self.get_videos_by_tag(self, app, tag)
        blogs = self.get_blogs_by_tag(self, app, tag)

        dict = {
            "book": books,
            "video": videos,
            "blog": blogs
        }

        return jsonify(dict)

    def get_books(self, app):
        with app.app_context():
            books = Book.query.all()
            return jsonify([book.serialize for book in books])

    def get_books_by_tag(self, app, tag):
        return self.get_something_by_tag(self, app, tag, Book)

    def get_not_read_books(self, app):
        return jsonify(self.get_books_by_read(self, app, True))

    def get_read_books(self, app):
        return jsonify(self.get_books_by_read(self, app, False))

    def get_books_by_read(self, app, read):
        with app.app_context():
            books = Book.query.filter(Book.isRead == read).all()
            return [book.serialize for book in books]

    def get_blogs(self, app):
        with app.app_context():
            blogs = Blog.query.all()
            return jsonify([blog.serialize for blog in blogs])

    def get_blogs_by_tag(self, app, tag):
        return self.get_something_by_tag(self, app, tag, Blog)

    def get_videos(self, app):
        with app.app_context():
            videos = Video.query.all()
            return jsonify([video.serialize for video in videos])

    def get_videos_by_tag(self, app, tag):
        return self.get_something_by_tag(self, app, tag, Video)

    def get_something_by_tag(self, app, tag, something):
        with app.app_context():
            something_by_tag = something.query.join(Recommendation, something.recommendation_id == Recommendation.id).join(
                TagRecommendation, Recommendation.id == TagRecommendation.recommendation_id).join(Tag, TagRecommendation.tag_id == Tag.id).filter(func.lower(Tag.name.contains(func.lower(tag))))

            return [recommendation.serialize for recommendation in something_by_tag]

    def post_video(self, db, json):
        with app.app_context():
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
                    tag_in_database = Tag.query.filter(Tag.name == tag).first()
                    if tag_in_database == None:
                        self.add_tag(self, rec, db, tag)
                    else:
                        self.add_tag_recommendation(
                            self, rec, db, tag_in_database)

            return jsonify(video.serialize)

    def post_book(self, db, json):
        with app.app_context():
            title = json.get('title')
            author = json.get('author')
            isbn = json.get('isbn')
            isRead = 0

            rec = Recommendation()
            book = Book(title=title, author=author, isbn=isbn,
                        isRead=isRead, recommendation=rec)

            db.session.add(rec)
            db.session.add(book)
            db.session.commit()

            db.session.refresh(rec)

            if json.get('tags'):
                for tag in json.get('tags'):
                    tag_in_database = Tag.query.filter(Tag.name == tag).first()
                    if tag_in_database == None:
                        self.add_tag(self, rec, db, tag)
                    else:
                        self.add_tag_recommendation(
                            self, rec, db, tag_in_database)

            return jsonify(book.serialize)

    def post_blog(self, db, json):
        with app.app_context():
            blogger = json.get('blogger')
            url = json.get('url')
            title = json.get('title')

            rec = Recommendation()
            blog = Blog(url=url, title=title,
                        blogger=blogger, recommendation=rec)

            db.session.add(rec)
            db.session.add(blog)
            db.session.commit()

            db.session.refresh(rec)

            if json.get('tags'):
                for tag in json.get('tags'):
                    tag_in_database = Tag.query.filter(Tag.name == tag).first()
                    if tag_in_database == None:
                        self.add_tag(self, rec, db, tag)
                    else:
                        self.add_tag_recommendation(
                            self, rec, db, tag_in_database)

            return jsonify(blog.serialize)

    def update_book(self, db, book_id):
        with app.app_context():
            book = db.session.query(Book).filter(Book.id == book_id).first()

            if book.isRead == False:
                book.isRead = True
            elif book.isRead == True:
                book.isRead = False

            db.session.commit()
            book = Book.query.get(book_id)

            return jsonify(book.serialize)

    def get_book(self, db, book_id):
        with app.app_context():
            book = db.session.query(Book).filter(Book.id == book_id).first()
            if book == None:
                return Response("", status=404)

            return jsonify(book.serialize)

    def get_video(self, db, video_id):
        with app.app_context():
            video = db.session.query(Video).filter(
                Video.id == video_id).first()
            if video == None:
                return Response("", status=404)

            return jsonify(video.serialize)

    def add_tag(self, rec, db, tag):
        tagObject = Tag(name=tag)
        db.session.add(tagObject)
        db.session.commit()

        db.session.refresh(tagObject)

        tagRec = TagRecommendation(
            tag_id=tagObject.id, recommendation_id=rec.id)
        db.session.add(tagRec)
        db.session.commit()

    def add_tag_recommendation(self, rec, db, tag):
        tag_recommandation = TagRecommendation(
            tag_id=tag.id, recommendation_id=rec.id)
        db.session.add(tag_recommandation)
        db.session.commit()

    def reset_database(self):
        with app.app_context():
            db2 = returnDB()
            db2.drop_all()
            db2.create_all()
            db2.session.commit()
