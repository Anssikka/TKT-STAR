from sqlalchemy.orm import relationship

from .. import db

class Recommendation(db.Model):
   __tablename__ = 'recommendation'
   id = db.Column(db.Integer, primary_key=True)
   book = relationship("Book", uselist=False, backref="recommendation")
   video = relationship("Video", uselist=False, backref="recommendation")

class Book(db.Model):
   __tablename__ = 'book'
   id = db.Column(db.Integer, primary_key=True)
   recommendation_id = db.Column(db.Integer, db.ForeignKey('recommendation.id'))
   title = db.Column(db.String(250), nullable=False)
   author = db.Column(db.String(250), nullable=False)
   isbn = db.Column(db.String(250), nullable=True)
   isRead = db.Column(db.Boolean, nullable =True)


   @property
   def serialize(self):
      return {
         'title':self.title,
         'author':self.author,
         'isbn':self.isbn,
         'tags':self.tags,
         'id':self.id,
         'isRead': self.isRead,
      }


class Video(db.Model):
   __tablename__ = 'video'
   id = db.Column(db.Integer, primary_key=True)
   recommendation_id = db.Column(db.Integer, db.ForeignKey('recommendation.id'))
   url = db.Column(db.String(250), nullable=False)
   title = db.Column(db.String(250), nullable=False)

   @property
   def serialize(self):
      return {
         'url': self.url,
         'title': self.title,
      }