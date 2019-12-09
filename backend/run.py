import os
from application import app

PORT = int(os.getenv('PORT', '5000'))

if __name__ == '__main__':
    app.run(debug=True, port=PORT)
    print("Running on port: " + str(PORT))
