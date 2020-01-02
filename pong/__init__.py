import os

from flask import Flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)


from flask_socketio import SocketIO

socketio=SocketIO()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config['TEMPLATES_AUTO_RELOAD']=True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

    

    # a simple page that says hello
    @app.route('/')
    def index():
        return render_template('auth/default.html')
    
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    socketio.init_app(app)

    
  

    
    return app