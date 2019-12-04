import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__, static_folder="built_frontend")

app.config['CORS_HEADERS'] = 'Content-Type'

if os.environ.get("HEROKU"):
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.config["SQLALCHEMY_ECHO"] = True

cors = CORS(app)
db = SQLAlchemy(app)

from .Models.models import Book, Recommendation, Video



def create_app(config_ubject):
    app.config.from_object(config_object)
    return app

def init_db():
    db.create_all()
    db.session.commit()

def returnDB():
    return db

from application import views

from .views import dbh