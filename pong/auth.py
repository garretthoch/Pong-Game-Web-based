import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash


auth = Blueprint('auth', __name__,static_folder='static')

@auth.route('/register', methods=('GET', 'POST'))
def register():
    return render_template('auth/register.html', authTitle='Register')

@auth.route('/login', methods=('GET', 'POST'))
def login():
    return render_template('auth/login.html', authTitle='Login')

@auth.route('/logout')
def logout():
    print("hello world")
