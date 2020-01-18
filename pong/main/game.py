
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
        emit('response', f"xball: {pong.xball} yball: {pong.yball} p1pos: {pong.playerpos['player2']}")
    else:
        emit('moveball',{'x':pong.xball, 'y':pong.yball})
        emit('response', "Game Over")
        #endmessage= f"Player 1 lost... xball: {pong.xball} yball: {pong.yball} P1Pos {pong.playerpos['player1']}"
        #emit('response', endmessage)

@socketio.on('playerMove')
def updatePlayer(message):
    pong.updateplayerpos('player1',message['p1'])
    pong.updateplayerpos('player2',message['p2'])

@socketio.on('setup')
def setup(message):
    height= message['height']
    width=message['width']
    p1dict = {'width':pong.paddleWidth, 'length':pong.paddleLength,'x':pong.paddleoffset, 'y':round(height/2-pong.paddleLength/2)}
    p2dict = {'width':pong.paddleWidth, 'length':pong.paddleLength,'x':width-pong.paddleoffset-pong.paddleWidth, 'y':round(height/2-pong.paddleLength/2)}
    bdict = {'length':pong.ballLen, 'x':width/2, 'y':height/2}
    emit('parameters', {'paddle1':p1dict, 'paddle2':p2dict,'ball':bdict})

