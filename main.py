import os
import pymysql

from flask import Flask, request, render_template, url_for, redirect, flash, session
app = Flask(__name__)

import logging
from logging.handlers import RotatingFileHandler

@app.route('/login', methods=['GET', 'POST'])
def login():
    error=None
    if request.method == 'POST':
        if valid_login(request.form['username'], request.form['password']):
            flash('Successfully logged in.')
            session['username'] = request.form.get('username')
            return redirect(url_for('welcome'))

        else:
            error = 'Incorrect username and password.'
            app.logger.warning('Incorrect username and password for user (%s)',request.form.get('username'))
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

def valid_login(username, password):
    # mysql
    MYSQL_DATABASE_HOST = os.getenv('IP', '127.0.0.1')
    MYSQL_DATABASE_USER = 'GOL_user'
    MYSQL_DATABASE_PASSWORD = 'DBMaster@731'
    MYSQL_DATABASE_DB = 'game_of_life'
    conn = pymysql.connect(
        host=MYSQL_DATABASE_HOST,
        user=MYSQL_DATABASE_USER,
        passwd=MYSQL_DATABASE_PASSWORD,
        db=MYSQL_DATABASE_DB
    )
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user WHERE username='%s' AND password='%s'" % (username, password))
    data = cursor.fetchone()
    if data:
        return True
    else: 
        return False

@app.route('/')
def welcome():
    if 'username' in session:
        return render_template('welcome.html', username=session['username'])
    else:
        return redirect(url_for('login'))

# @app.route('/hello')
# @app.route('/hello/<name>')
# def hello(name=None):
#     return render_template('hello.html', name=name)

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         return 'username is ' + request.values["username"]
#     else:
#         return '<form method="post" action="/login"><input type="text" name="username" /><p><button type="submit">Submit</button></form>'

# @app.route('/')
# def index():
#     return url_for('show_user_profile', username="user_name")
# 
# @app.route('/user/<username>')
# def show_user_profile(username):
#     #show the user profile 
#     return "User: %s" % username # casts variable after User to str

# @app.route('/hello')
# def hello_world():
#     # import pdb; pdb.set_trace()
#     return 'Hello world.'

# @app.route('/post/<int:post_id>')
# def show_post(post_id):
#     return "Post: %d" % post_id # casts variable after Post to int

if __name__ == '__main__':
    host = os.getenv('IP', '0.0.0.0')
    port = int(os.getenv('PORT', 5000))
    app.debug = True # delete for product env
    app.secret_key = '\xf8\x9dxY\r,\x82\xc9&K# qu\xdf\xa0n\xa34\n\x17q\xd4\xa0'
    
    #logging
    handler = RotatingFileHandler('error.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    
    app.run(host=host, port=port)

