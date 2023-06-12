from flask_app import app
from flask import render_template, redirect, request, session, jsonify
from flask_app.models.user import User
from flask_app.models.ride import Ride
from flask_app.models.join_ride import Join_ride
from datetime import datetime

# @app.route('/dashboard')
# def dashboard():
#     if 'user_id' in session:
#         all_rides = Ride.get_all()
#         if all_rides == 'No rides Yet' :
#             all_rides=[]
#         logged_user = User.get_by_id({'id' : session['user_id']})
#         user_rides_id = Join_ride.get_rides_id_for_user({'id' : session['user_id']})
#         return render_template('dashboard.html', user = logged_user, all_rides = all_rides, user_rides_id = user_rides_id)
#     return redirect('/')

@app.route('/api/rides')
def ride_form():
    if 'user_id' in session:
        logged_user = User.get_by_id({'id' : session['user_id']})
        return render_template('form_ride.html', user = logged_user)
    return redirect('/')

@app.route('/api/rides/', methods=['POST'])
def create_ride():
    if 'user_id' in session:
        errors = Ride.validate(request.form)
        if len(errors)==0:
            Ride.save({**request.form, 'user_id':session['user_id']})
            return jsonify({'errors' : []})
        return jsonify({'errors' : errors})
    return redirect('/')

@app.route('/api/my_created_rides')
def my_created_rides():
    if 'user_id' in session:
        logged_user = User.get_by_id({'id' : session['user_id']})
        created_rides = Ride.get_created_rides({'id' : session['user_id']})
        return render_template('created_rides.html', user = logged_user, rides = created_rides)
    return redirect('/')

@app.route('/my_rides')
def show_rides():
    if 'user_id' in session:
        created_rides = Ride.get_created_rides({'id' : session['user_id']})
        logged_user = User.get_by_id({'id':session['user_id']})
        user_rides_id = Join_ride.get_rides_id_for_user({'id' : session['user_id']})
        return render_template('my_rides.html', created_rides = created_rides, user = logged_user, user_rides_id=user_rides_id)
    return redirect('/')

@app.route('/rides/<int:ride_id>/view')
def view_ride(ride_id):
    if 'user_id' in session:
        ride = Ride.get_by_id({'id' : ride_id})
        if ride:
            logged_user = User.get_by_id({'id' : session['user_id']})
            creator = User.get_by_id({'id' : ride.user_id})
            passengers = Ride.get_ride_with_passengers({'id' : ride_id})
            return render_template('view_ride.html', ride = ride, user = logged_user, creator=creator, passengers=passengers)
    return redirect('/')

@app.route('/rides/<int:ride_id>/edit')
def edit_ride(ride_id):
    if 'user_id' in session:
        ride = Ride.get_by_id({'id' : ride_id})
        logged_user = User.get_by_id({'id' : session['user_id']})
        joined_rides = User.get_user_with_rides({'id' : session['user_id']})
        passengers = Ride.get_ride_with_passengers({'id' : ride_id})
        if ride:
            if ride.user_id == session['user_id'] :
                return render_template('edit_ride.html',joined_rides=joined_rides, ride = ride, user=logged_user, passengers=passengers)
            else :
                return redirect('/')
        else :
            return render_template('404.html')
    return redirect('/')

@app.route('/rides/<int:ride_id>/update', methods = ['POST'])
def update_ride(ride_id):
    if 'user_id' in session:
        errors = Ride.validate(request.form)
        if len(errors)>0:
            return jsonify({'errors' : errors})
        data = {
            **request.form, 'user_id' : session['user_id'], 'id' : ride_id
                }
        Ride.update(data)
        return jsonify({'errors' : []})
    return redirect('/')

@app.route('/rides/<int:ride_id>/delete')
def delete_ride(ride_id):
    if 'user_id' in session:
        ride_to_delete = Ride.get_by_id({'id' : ride_id})
        if ride_to_delete:
            if ride_to_delete.user_id == session['user_id'] :
                Join_ride.deleteByRide({'ride_id' : ride_id})
                Ride.delete({'id' : ride_id})
                return redirect('/home')
            else:
                return redirect('/')
        else :
            return render_template('404.html')
    return redirect('/')

@app.route('/api/rides/find')
def find():
    if 'user_id' in session:
        logged_user = User.get_by_id({'id' : session['user_id']})
        return render_template('find_ride.html', user=logged_user)
    else:
        return redirect('/')
    
@app.route('/api/rides/find', methods = ['POST'])
def find_rides():
    if 'user_id' in session:
        errors = Ride.validate(request.form)
        if len(errors)==0:
            data = {
                'from_location' : f"%%{request.form['from_location']}%%", 
                'to_location' : f"%%{request.form['to_location']}%%", 
                'when_time' : f"%%{datetime.strptime(request.form['when_time'], '%Y-%m-%dT%H:%M')}%%"
            }
            rides = Ride.findRides(data)
            return jsonify({'errors' : [], 'rides' : rides})
        return jsonify({'errors' : errors})
    return redirect('/')




