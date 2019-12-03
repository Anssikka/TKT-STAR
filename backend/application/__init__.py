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

def returnDB():
    return db

from .views import dbh

if not os.path.isfile('./application/database.db'):
    with app.app_context():
        db.create_all()
        print('***********************')
        print('LUODAAN UUSIKSI')
        tempi = {'author': 'Antwan Himmy', 'isbn': '4325311391', 'title': '100kg penkistä kuukaudessa', 'tags': ['Kehonrakennus', 'Hauiksenpaksuus']}
        dbh.post_book(dbh, db, tempi)
        tempi = {'author': 'Anssi Kattila', 'isbn': '4325242391', 'title': 'Rakastu, Rakastu jo!',
                 'tags': ['Rakastuminen', 'Alkoholi', 'Lifestyle']}
        dbh.post_book(dbh, db, tempi)
        tempi = {'author': 'Joakim Jansuu', 'isbn': '412311391', 'title': 'Parhaat stabilokynät',
                 'tags': ['Vitosen poika', 'Highlighting']}
        dbh.post_book(dbh, db, tempi)
        tempi = {'url': 'https://www.youtube.com/watch?v=Oj9A_z0pA1I', 'title': 'Jonin tanssimusat',
                 'tags': ['Tanssijalka', 'Vipattaa']}
        dbh.post_video(dbh, db, tempi)
        tempi = {'url': 'https://www.youtube.com/watch?v=I5z0W-rv4-Q', 'title': 'Valtterin huumorivideo',
                 'tags': ['Himoläski', 'Homer', 'kantsii kattoo nopee']}
        dbh.post_video(dbh, db, tempi)