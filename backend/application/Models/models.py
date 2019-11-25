from .. import db

class Book(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   title = db.Column(db.String(250), nullable=False)
   author = db.Column(db.String(250), nullable=False)
   isbn = db.Column(db.String(250), nullable=True)
   tags = db.Column(db.String(250), nullable=True)

   @property
   def serialize(self):
      return {
         'title':self.title,
         'author':self.author,
         'isbn':self.isbn,
         'tags':self.tags,
         'id':self.id,
      }