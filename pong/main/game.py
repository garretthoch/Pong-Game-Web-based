
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
    height= message['height']
    width=message['width']
    
    pong.gameStatus = "Running"
    emit('status',pong.gameStatus)
    
    pong.startgame(height,width)
    if ((pong.score["p1"] or pong.score["p2"]) == 2):
        pong.gameStatus = "GameOver"
    else:
        pong.gameStatus = "EndRound"
    
    emit('status',pong.gameStatus)
    emit('score',pong.score)



    

@socketio.on('updateball')
def updateball():
    emit('moveball',{'x':pong.xball, 'y':pong.yball})
    #emit('status',pong.gameStatus)
    #emit('response', f"xball: {pong.xball} yball: {pong.yball} p1pos: {pong.playerpos['player2']} status; {pong.gameStatus}")

        


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

