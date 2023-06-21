from flask_app import app
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_app.config.config import ApplicationConfig
from flask_app.controllers import users, rides, join_rides, rates, comments, messages
from flask import request, render_template

CORS(app, supports_credentials=True)
server_session = Session(app)

app.config.from_object(ApplicationConfig)
# CATCH ANY UNDEFINED ROUTE
@app.errorhandler(404)
def page_not_found(error):
    route = request.path
    return render_template('404.html', route = route)


if __name__ == "__main__":
    app.run(debug=True)