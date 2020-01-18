import time

class Pong:

    def __init__(self):
        self.playerpos={'player1':0, 'player2':0}
        self.ballLen=10
        self.yball=0
        self.xball=0
        self.gameRunning=False
        self.paddleLength = 75
        self.paddleWidth = 15
        self.paddleoffset= 10

    def updateplayerpos(self,player,y):
        self.playerpos[player]=y

    def startgame(self,height,width):
        xdir = 1
        ydir = 1
        self.xball = round(width/2)
        self.yball = round(height/2)
        xspeed =4
        yspeed =4
        ballL=10
        self.gameRunning=True
        

        while(self.gameRunning):
            if self.xball > (width-ballL-self.paddleWidth-self.paddleoffset): #ball at right paddle
                if(self.playerpos['player2']<= self.yball <= self.playerpos['player2']+self.paddleLength):#ball hit paddle on left side
                    ydir =paddlePhysics(self.yball,self.playerpos['player2'] ,ydir)
                    xdir =-1
                else:#paddle missed ball
                    self.gameRunning=False
                    break

            if (self.xball < self.paddleWidth+self.paddleoffset): #ball at left paddle
                if(self.playerpos['player1']<= self.yball <= self.playerpos['player1']+self.paddleLength):#ball hit paddle on right side
                    ydir =paddlePhysics(self.yball,self.playerpos['player1'] ,ydir)
                    xdir =1
                else: #paddle missed ball
                    self.gameRunning=False
                    break

            if self.yball >= (height-ballL): #ball hit bottom of game area
                ydir =-1
            if self.yball <= 0: #ball hit top of game area
                ydir =1
            


            
            self.xball = self.xball + (xdir*xspeed)
            self.yball = self.yball + (ydir*yspeed)
            time.sleep(1/60)
        

        def paddlePhysics(self,yball, ypaddle,ydir):
            #determine where the ball hit the paddle and adjust the speeds as necessary
            #top third add speed in the y direction
            #bottom third add speed in the -y direciton
            #center no change
            #logic needs to be fixed here is a source
            #https://gamedev.stackexchange.com/questions/4253/in-pong-how-do-you-calculate-the-balls-direction-when-it-bounces-off-the-paddl
            ptop = self.paddleLength/3
            pmiddle= 2*self.paddleLength/3
            pbottom= self.paddleLength
            if (0 <= yball-ypaddle<=ptop): # top thrid
                ydir = -1
            elif (ptop<=(yball-ypaddle)<=pmiddle): # middle third
                ydir = ydir
            elif (pmiddle<=(yball-ypaddle)<=pbottom) : #if bottom third
                ydir = 1
            return ydir
            


