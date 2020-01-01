

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from . import main


@main.route('/register', methods=('GET', 'POST'))
def register():
    return render_template('auth/register.html', authTitle='Register')

@main.route('/login', methods=('GET', 'POST'))
def login():
    return render_template('auth/login.html', authTitle='Login')

@main.route('/logout')
def logout():
    print("hello world")
