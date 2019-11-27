import os
import tempfile

import pytest

from application import app
from application import init_db


@pytest.fixture
def client():

    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True

    with app.test_client() as client:
        with app.app_context():
            init_db()
        yield client

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])


def test_initialized_db(client):
    rv = client.get('/api/recommendations/books')

    assert b'Clean Code: A Handbook of Agile Software Craftsmanship' in rv.data


def test_get_after_post(client):
    rv = client.post('/api/recommendations/books', json={'title': 'TestTitle',
                                'author': 'TestAuthor',
                                'isbn': 'TestISBN',
                                'tags': 'TestTags'})

    rv = client.get('/api/recommendations/books')

    assert b'TestTitle' in rv.data
