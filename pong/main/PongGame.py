import time

class Pong:

    def __init__(self):
        self.playerpos={'player1':0, 'player2':0}
        self.ballLen=10
        self.yball=0
        self.xball=0
        self.gameRunning=False
        self.paddleLenght = 75
        self.paddleWidth = 15

    def updateplayerpos(self,player,y):
        self.playerpos[player]=y

    def startgame(self,height,width):
        xdir = 1
        ydir = 1
        self.xball = width/2
        self.yball = height/2
        xspeed =4
        yspeed =4
        maxspeed = 4
        minspeed = 1
        ballL=10
        paddleWidth = 15
        paddleLength= 75
        self.gameRunning=True
        ptop = paddleLength/3
        pmiddle= 2*paddleLength/3
        pbottom= paddleLength

        while(True):
            if self.xball >= (width-ballL): #ball hit right side of game area
                xdir =-1
            if (self.xball < paddleWidth):
                if(self.playerpos['player1']<= self.yball <= self.playerpos['player1']+paddleLength):#ball hit paddle
                    #determine where the ball hit the paddle and adjust the speeds as necessary
                    #top third add speed in the y direction
                    #bottom third add speed in the -y direciton
                    #center no change
                    #logic needs to be fixed here is a source
                    #https://gamedev.stackexchange.com/questions/4253/in-pong-how-do-you-calculate-the-balls-direction-when-it-bounces-off-the-paddl
                    if (0<=(self.yball-self.playerpos['player1'])<=ptop ): #if top third 
                        ydir = -1
                    elif (pmiddle<=(self.yball-self.playerpos['player1'])<=pbottom) : #if bottom third
                        ydir = 1
      
                    xdir =1
                else:
                    break

            if self.yball >= (height-ballL): #ball hit bottom of game area
                ydir =-1
            if self.yball <= 0: #ball hit top of game area
                ydir =1
            


            
            self.xball = self.xball + (xdir*xspeed)
            self.yball = self.yball + (ydir*yspeed)
            time.sleep(1/60)
        self.gameRunning=False


