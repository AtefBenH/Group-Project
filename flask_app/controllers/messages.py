from flask_app import app
from flask import request, session, jsonify, redirect
from flask_app.models.message import Message

@app.route('/messages/<int:profile_id>/send', methods = ['POST'])
def sendMessage(profile_id):
    if 'user_id' in session:
        status = 'Fail'
        print("#"*30, request.form['message'], "#"*30)
        if Message.validate(request.form):
            data = {
                'sender_id' : session['user_id'],
                'receiver_id' : profile_id,
                'message' : request.form['message'],
                'ride_id' : request.form['ride_id']
            }
            Message.send(data)
            status = 'Success'
        return jsonify({'status' : status})
    return redirect('/')