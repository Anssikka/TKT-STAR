import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__, static_folder="built_frontend")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app)
db = SQLAlchemy(app)

from .Models.models import Book

from application import views

def create_app(config_ubject):
    app.config.from_object(config_object)
    return app

def init_db():
    db.create_all()
    db.session.commit()

if not os.path.isfile('./application/database.db'):
   db.create_all()
   db.session.add(Book(title="Clean Code: A Handbook of Agile Software Craftsmanship", author='Robert Martin', isbn='978-0132350884', tags='Ohjelmointi, design patterns'))
   db.session.add(Book(title="Clean Agile", author='Robert Martin', isbn='9784322350884', tags='Ohjelmointi, design patterns, Ohjelmistuotanto, Agile'))
   db.session.commit()

