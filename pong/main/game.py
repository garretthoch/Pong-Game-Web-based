
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from flask_socketio import emit
from .. import socketio

from . import main

import time

user1x = 0
user1y = 0

ballx = 0
bally = 0

gameareah = 0
gameareaw = 0

balllen= 10

xdirection = 1 #left is negative right is positivite
ydirection = 1 # up is positive down is negative

@main.route('/play', methods=('GET', 'POST'))
def play():
    return render_template('game/default.html')

@socketio.on('startconditions')
def connect(gamearea):
    gameareah=gamearea['height']
    gameareaw=gamearea['width']
    bally = gameareah/2
    ballx = gameareaw/2
    

@socketio.on('move', )
def move(json):
    emit('update', json['y'])

@socketio.on('updateball')
def moveball():
    emit('moveball', {'xball':ballx,'yball':bally})

while(True):
    if xdirection == gameareaw-balllen:
        xdirection = -1
    if xdirection == 0:
        xdirection = 1
    if ydirection == 0:
        ydirection = -1
    if ydirection == gameareah-balllen:
        ydirection = 1
    ballx +=xdirection
    bally +=ydirection
    time.sleep(1)