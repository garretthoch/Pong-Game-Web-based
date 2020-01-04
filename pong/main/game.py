
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from flask_socketio import emit
from .. import socketio

from . import main

import time


@main.route('/play', methods=('GET', 'POST'))
def play():
    return render_template('game/default.html')

@socketio.on('test')
def connect(json):
    emit('response', json['test'])


@socketio.on('moveup')
def moveup(json):
    emit('response', json['direction'])

@socketio.on('movedown')
def movedown(json):
    emit('response', json['direction'])

@socketio.on('startgame')
def startgame(message):
    ydir=1#positive=right
    xdir=1 #positive=up
    speed=20
    height=message['gameh']
    width=message['gamew']
    xball=width/2
    yball=height/2
    lball = 10
    while(True):
        if xball <= 0:
            xdir=1
        if xball >= width-lball:
            xdir = -1
        if yball <= 0:
            ydir=1
        if yball >= height-lball:
            ydir = -1
        
        xball+=(xdir*speed)
        yball+=(ydir*speed)
        #xball +=xdir
        #yball +=ydir
        emit('moveball',{'x':xball, 'y':yball, 'l':lball})
        time.sleep(.5)


