from flask_app import app
from flask import request, session, jsonify, redirect
from flask_app.models.message import Message
from flask_cors import CORS, cross_origin
from flask_session import Session

server_session = Session(app)
CORS(app, supports_credentials=True)

@app.route('/messages/<int:profile_id>/send', methods = ['POST'])
def sendMessage(profile_id):
    user_id = session.get('user_id')
    if user_id:
        status = 'Fail'
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


@app.route('/messages/<int:message_id>/delete')
def delete_Message(message_id):
    user_id = session.get('user_id')
    if user_id:
        data = {
            'id' : message_id
        }
        Message.remove_message(data)
        status = 'Success'
        # return jsonify({'status' : status})
        return redirect('/home')
    return redirect('/')


@app.route('/messages/<int:message_id>/asread')
def asReadMessage(message_id):
    user_id = session.get('user_id')
    if user_id:
        Message.asReadMessage({'id' : message_id})
        return jsonify({'status' : 'Success'})
    return redirect('/')