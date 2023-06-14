from flask_app import app
from flask import render_template, redirect, request, session, jsonify
from flask_app.models.user import User
from flask_app.models.ride import Ride
from flask_app.models.join_ride import Join_ride
from flask_app.models.rate import Rate
from datetime import datetime

@app.route('/rates/create/<int:profile_id>/<int:user_id>', methods = ['POST'])
def rate(profile_id, user_id):
    data = {
        'profile_id' : profile_id,
        'rater_id' : user_id,
        'rate' : request.form['rate']
    }
    Rate.save(data)
    return redirect(f'/users/{profile_id}/view')

