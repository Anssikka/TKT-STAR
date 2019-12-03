import os
import tempfile

import pytest

from application import app
from application import init_db, returnDB

import json


@pytest.fixture
def client():
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database_test.db'

    app.config['TESTING'] = True

    with app.test_client() as client:
        with app.app_context():
            init_db()
        yield client


def test_get_books_after_post(client):

    rv = client.post('/api/recommendations/books', json={'title': 'TestTitle',
                                                         'author': 'TestAuthor',
                                                         'isbn': 'TestISBN',
                                                         'tags': ['TestTags']})

    rv = client.get('/api/recommendations/books')

    assert b'TestTitle' in rv.data
    assert b'TestAuthor' in rv.data
    assert b'TestISBN' in rv.data
    assert b'TestTags' in rv.data

    db = returnDB()
    db.drop_all()


def test_get_videos_after_post(client):

    rv = client.post('/api/recommendations/videos', json={'title': 'TestTitle',
                                                          'url': 'www.testurl.fi',
                                                          'tags': ['TestTags']})

    rv = client.get('/api/recommendations/videos')

    assert b'TestTitle' in rv.data
    assert b'www.testurl.fi' in rv.data
    assert b'TestTags' in rv.data

    db = returnDB()
    db.drop_all()


def test_change_book_isRead(client):
    rv = client.post('/api/recommendations/books', json={'title': 'TestTitle',
                                                         'author': 'TestAuthor',
                                                         'isbn': 'TestISBN',
                                                         'tags': ['TestTags']})

    json_data = rv.get_json()

    book_id = json_data.get('id')

    assert json_data.get('isRead') == False

    rv = client.post('/api/recommendations/books/' + str(book_id))

    rv = client.get('/api/recommendations/books/' + str(book_id))

    json_data = rv.get_json()

    assert json_data.get('isRead') == True

    rv = client.post('/api/recommendations/books/' + str(book_id))

    rv = client.get('/api/recommendations/books/' + str(book_id))

    json_data = rv.get_json()

    assert json_data.get('isRead') == False

    db = returnDB()
    db.drop_all()


def test_cannot_get_nonexistant_book(client):
    rv = client.post('/api/recommendations/books', json={'title': 'TestTitle',
                                                         'author': 'TestAuthor',
                                                         'isbn': 'TestISBN',
                                                         'tags': ['TestTags']})

    rv = client.get('/api/recommendations/books/2')

    assert rv.status_code == 404

    db = returnDB()
    db.drop_all()


def test_cannot_get_nonexistant_video(client):
    rv = client.get('/api/recommendations/videos/1')

    assert rv.status_code == 404

    db = returnDB()
    db.drop_all()
