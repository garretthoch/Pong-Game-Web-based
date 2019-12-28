import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash


game = Blueprint('game', __name__,static_folder='static')

@game.route('/play', methods=('GET', 'POST'))
def register():
    return render_template('game/default.html')