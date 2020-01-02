
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from flask_socketio import emit
from .. import socketio

from . import main


@main.route('/play', methods=('GET', 'POST'))
def play():
    return render_template('game/default.html')

@socketio.on('test')
def connect(json):
    emit('response', json['test'])