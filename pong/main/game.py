
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from flask_socketio import emit
from .. import socketio

from . import main

from .PongGame import Pong

import time





pong = Pong()   


@main.route('/play', methods=('GET', 'POST'))
def play():
    return render_template('game/default.html')






@socketio.on('startgame')
def startgame(message):
    #emit('response', "Running...")
    height= message['height']
    width=message['width']
    pong.startgame(height,width)

@socketio.on('updateball')
def updateball():
    if pong.gameRunning:
        emit('moveball',{'x':pong.xball, 'y':pong.yball})
        emit('response', f"yball: {pong.yball} p1pos: {pong.playerpos['player1']}")
    else:
        emit('moveball',{'x':pong.xball, 'y':pong.yball})
        #endmessage= f"Player 1 lost... xball: {pong.xball} yball: {pong.yball} P1Pos {pong.playerpos['player1']}"
        #emit('response', endmessage)

@socketio.on('playerMove')
def updatePlayer(message):
    pong.updateplayerpos('player1',message)

