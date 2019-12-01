import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app)
db = SQLAlchemy(app)

from .Models.models import Book, Recommendation, Video

from application import views

def create_app(config_ubject):
    app.config.from_object(config_object)
    return app

def init_db():
    db.create_all()
    db.session.commit()



if not os.path.isfile('./application/database.db'):
    db.create_all()
    recommendation = Recommendation()
    book = Book(title="Clean Code: A Handbook of Agile Software Craftsmanship", author='Robert Martin', isbn='978-0132350884', recommendation=recommendation, isRead=0)
    db.session.add(recommendation)
    db.session.add(book)
    db.session.commit()
    recommendation = Recommendation()
    video = Video(url='https://www.youtube.com/watch?v=iRXJXaLV0n4', title='Netin parhaimmat kissavideot', recommendation=recommendation)
    db.session.add(recommendation)
    db.session.add(video)
    db.session.commit()



