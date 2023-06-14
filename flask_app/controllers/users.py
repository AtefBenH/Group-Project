from flask_app import app
from flask import render_template, redirect, request, session, jsonify
from flask_app.models.user import User
from flask_app.models.rate import Rate
from flask_app.models.comment import Comment
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)


@app.route('/')
def index():
    if 'user_id' in session:
        return redirect('/home')
    return render_template('login.html')

@app.route('/home')
def home():
    if 'user_id' in session:
        logged_user = User.get_by_id({'id' : session['user_id']})
        return render_template('home.html', user = logged_user)
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/api/users/register', methods = ['POST'])
def create_user():
    # data = request.get_json()
    errors = User.validate(request.form)
    
    if len(errors)==0:
        hashed_password = bcrypt.generate_password_hash(request.form['password'])
        data = {
                **request.form, 'password':hashed_password
            }
        session['user_id'] = User.save(data)
        return jsonify({'errors' : 'success'})
    return jsonify({'errors' : errors})

@app.route('/api/users')
def get_all():
    all_users = User.get_all_users()
    return jsonify({'all_users' : all_users})

@app.route('/api/users/login', methods = ['POST'])
def login():
    # data = request.get_json()
    user_from_db = User.get_by_email({'email' : request.form['email']})
    if user_from_db :
        if bcrypt.check_password_hash(user_from_db.password, request.form['password']):
            session['user_id'] = user_from_db.id
            return jsonify({'message' : "success"})
    return jsonify({'message' : "Error"})

@app.route('/users/<int:profile_id>/view')
def view_profile(profile_id):
    if 'user_id' in session:
        profile = User.get_by_id({'id' : profile_id})
        if profile:
            logged_user = User.get_by_id({'id' : session['user_id']})
            rate = Rate.getAvgRate({'id' : profile_id})
            comments = Comment.getAllByProfile({'id' : profile_id})
            print("#"*30, comments, "#"*30)
            return render_template('view_profile.html',user = logged_user, profile = profile, rate = rate, comments = comments)
    return redirect('/')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')