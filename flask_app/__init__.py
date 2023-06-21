from flask import Flask
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_app.config.config import ApplicationConfig


app = Flask(__name__)
app.config.from_object(ApplicationConfig)

server_session = Session(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
cors = CORS(app, supports_credentials=True)

DATABASE = "car_pool_schema"