from flask_app import app
from flask import redirect, session, jsonify
from flask_app.models.ride import Ride
from flask_app.models.join_ride import Join_ride


@app.route('/join_rides/<int:ride_id>/create')
def add_join_ride(ride_id):
    if 'user_id' in session:
        data = {
            'user_id' : session['user_id'],
            'ride_id' : ride_id
        }
        Join_ride.save(data)
        Ride.updateSeats({'id' : ride_id})
        return jsonify({'message' : "success"})
    return redirect('/')

@app.route('/join_rides/<int:ride_id>/delete')
def delete(ride_id):
    if 'user_id' in session:
        data = {
            'user_id' : session['user_id'],
            'ride_id' : ride_id
        }
        Join_ride.cancel(data)
        Ride.addSeat({'id' : ride_id})
        return jsonify({'message' : "success"})
    return redirect('/')
