import os
import tempfile

import pytest

from ..Models.models import Book, Video, Recommendation, Tag, TagRecommendation, Blog
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


def test_get_blogs_after_post(client):
    rv = client.post('/api/recommendations/blogs', json={'title': 'TestTitle2',
                                                         'url': 'TestUrl',
                                                         'blogger': 'TestISBN',
                                                         'tags': ['TestTags']})

    rv = client.get('/api/recommendations/blogs')

    assert b'TestTitle2' in rv.data
    assert b'TestUrl' in rv.data
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


def test_all_videos_blogs_and_books_are_found(client):
    client.post('/api/recommendations/books', json={"title": "TITLE",
                                                    "author": "AUTHOR",
                                                    "isbn": 23452345,
                                                    "tags": ["tag1", "tag2"]
                                                    })

    client.post('/api/recommendations/videos', json={"url": "WWW.URLI.COM",
                                                     "title": "TITLE",
                                                     "tags": ["tag3", "tag4"]
                                                     })

    client.post('/api/recommendations/blogs', json={"blogger": "BLOGGER",
                                                    "url": "WWW.URLI.COM",
                                                    "title": "TITLE",
                                                    "tags": ["tag3", "tag4"]
                                                    })

    json_data = client.get('/api/recommendations/').get_json()

    book = json_data.get('book')
    blog = json_data.get('blog')
    video = json_data.get('video')

    assert len(book) == 1
    assert len(blog) == 1
    assert len(video) == 1

    db = returnDB()
    db.drop_all()


def test_no_duplicate_tags_are_created(client):
    client.post('/api/recommendations/books', json={"title": "TITLE",
                                                    "author": "AUTHOR",
                                                    "isbn": 23452345,
                                                    "tags": ["tag1", "tag2"]
                                                    })

    client.post('/api/recommendations/videos', json={"url": "WWW.URLI.COM",
                                                     "title": "TITLE",
                                                     "tags": ["tag1", "tag3"]
                                                     })

    client.post('/api/recommendations/blogs', json={"blogger": "BLOGGER",
                                                    "url": "WWW.URLI.COM",
                                                    "title": "TITLE",
                                                    "tags": ["tag1", "tag2"]
                                                    })

    tags = [tag.serialize for tag in Tag.query.all()]

    assert len(tags) == 3

    db = returnDB()
    db.drop_all()


def test_all_videos_blogs_and_books_with_specific_tag_are_found(client):
    client.post('/api/recommendations/books', json={"title": "TITLE",
                                                    "author": "AUTHOR",
                                                    "isbn": 234523451,
                                                    "tags": ["tag1", "tag2"]
                                                    })

    client.post('/api/recommendations/books', json={"title": "TITLE2",
                                                    "author": "AUTHOR2",
                                                    "isbn": 234523452,
                                                    "tags": ["tag2", "tag3"]
                                                    })

    client.post('/api/recommendations/videos', json={"url": "WWW.URLI.COM",
                                                     "title": "TITLE",
                                                     "tags": ["tag3", "tag4"]
                                                     })

    client.post('/api/recommendations/videos', json={"url": "WWW.URLI2.COM",
                                                     "title": "TITLE2",
                                                     "tags": ["tag1", "tag4"]
                                                     })

    client.post('/api/recommendations/blogs', json={"blogger": "BLOGGER",
                                                    "url": "WWW.URLI.COM",
                                                    "title": "TITLE",
                                                    "tags": ["tag3", "tag4"]
                                                    })

    client.post('/api/recommendations/blogs', json={"blogger": "BLOGGER2",
                                                    "url": "WWW.URLI2.COM",
                                                    "title": "TITLE2",
                                                    "tags": ["tag1", "tag4"]
                                                    })

    json_data = client.get('/api/recommendations/tag/tag1').get_json()

    book = json_data.get('book')
    blog = json_data.get('blog')
    video = json_data.get('video')

    assert len(book) == 1
    assert len(blog) == 1
    assert len(video) == 1

    db = returnDB()
    db.drop_all()


def test_correct_number_of_read_and_not_read_books_are_found(client):
    client.post('/api/recommendations/books', json={"title": "TITLE",
                                                    "author": "AUTHOR",
                                                    "isbn": 234523451,
                                                    "tags": ["tag1", "tag2"]
                                                    })

    client.post('/api/recommendations/books', json={"title": "TITLE2",
                                                    "author": "AUTHOR2",
                                                    "isbn": 234523452,
                                                    "tags": ["tag2", "tag3"]
                                                    })

    client.post('/api/recommendations/books', json={"title": "TITLE3",
                                                    "author": "AUTHOR3",
                                                    "isbn": 234523453,
                                                    "tags": ["tag2", "tag3"]
                                                    })

    client.post('/api/recommendations/books', json={"title": "TITLE4",
                                                    "author": "AUTHOR4",
                                                    "isbn": 234523454,
                                                    "tags": ["tag2", "tag3"]
                                                    })

    client.post('/api/recommendations/books', json={"title": "TITLE5",
                                                    "author": "AUTHOR5",
                                                    "isbn": 234523455,
                                                    "tags": ["tag2", "tag3"]
                                                    })

    client.post('/api/recommendations/books', json={"title": "TITLE6",
                                                    "author": "AUTHOR6",
                                                    "isbn": 234523456,
                                                    "tags": ["tag2", "tag3"]
                                                    })

    for id in range(1, 4):
        client.post('/api/recommendations/books/' + str(id))

    read = client.get('/api/recommendations/books/read').get_json()
    not_read = client.get('/api/recommendations/books/not_read').get_json()

    assert len(read) == 3
    assert len(not_read) == 3

    db = returnDB()
    db.drop_all()
