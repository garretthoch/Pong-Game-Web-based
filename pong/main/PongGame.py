import time
import random

class Pong:

    def __init__(self):
        self.playerpos={'player1':0, 'player2':0}
        self.score= {'p1':0, 'p2':0}
        self.ballLen=10
        self.yball=0
        self.xball=0
        self.paddleLength = 75
        self.paddleWidth = 15
        self.paddleoffset= 10
        self.gameStatus="Initialized"

    def updateplayerpos(self,player,y):
        self.playerpos[player]=y

    def paddlePhysics(self,yball, ypaddle,ydir,paddleLength):
        #determine where the ball hit the paddle and adjust the speeds as necessary
        #top third add speed in the y direction
        #bottom third add speed in the -y direciton
        #center no change
        #logic needs to be fixed here is a source
        #https://gamedev.stackexchange.com/questions/4253/in-pong-how-do-you-calculate-the-balls-direction-when-it-bounces-off-the-paddl
        ptop = paddleLength/3
        pmiddle= 2*paddleLength/3
        pbottom= paddleLength
        if (0 <= yball-ypaddle<=ptop): # top thrid
            ydir = -1
        elif (pmiddle<=(yball-ypaddle)<=pbottom) : #if bottom third
            ydir = 1
        return ydir

    def startgame(self,height,width):
        
        
        xdir = (1 if random.random() < .5 else -1)
        ydir = (1 if random.random() < .5 else -1)
        self.xball = round(width/2)
        self.yball = round(height/2)
        xspeed =2
        yspeed =2
        ballL=10
       
       

        
        

        while(True):
            if self.xball > (width-ballL-self.paddleWidth-self.paddleoffset): #ball at right paddle
                if(self.playerpos['player2']<= self.yball <= self.playerpos['player2']+self.paddleLength):#ball hit paddle on left side
                    ydir =self.paddlePhysics(self.yball,self.playerpos['player2'] ,ydir, self.paddleLength)
                    xdir =-1
                else:#paddle missed ball
                    self.score['p1']+=1
                    break



            if (self.xball < self.paddleWidth+self.paddleoffset): #ball at left paddle
                if(self.playerpos['player1']<= self.yball <= self.playerpos['player1']+self.paddleLength):#ball hit paddle on right side
                    ydir =self.paddlePhysics(self.yball,self.playerpos['player1'] ,ydir, self.paddleLength)
                    xdir =1
                else: #paddle missed ball
                    self.score['p2']+=1
                    break


            if self.yball >= (height-ballL): #ball hit bottom of game area
                ydir =-1
            if self.yball <= 0: #ball hit top of game area
                ydir =1
            


            
            self.xball = self.xball + (xdir*xspeed)
            self.yball = self.yball + (ydir*yspeed)
            time.sleep(1/120)
    
    def newGame(self):
        self.score= {'p1':0, 'p2':0}



            


