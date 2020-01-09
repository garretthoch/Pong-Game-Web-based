

class Pong:

    def __init__(self,xball,yball,height,width):
        self.xball=xball
        self.yball=yball
        self.playerpos={'player1':0, 'player2':0}
        self.areawidth=width
        self.areaheight=height
        self.ballLen=10

    def updateplayerpos(self,player,y):
        self.playerpos[player]=y

    def startgame(self):
        xdir = 1
        ydir = 1
        xspeed =1
        yspeed =1
        while(True):
            if self.xball >= (self.areawidth-self.ballLen): #ball hit right side of game area
                xdir =-1
            if self.xball <= 0:#ball hit left side of game area
                xdir =1
            if self.yball >= (self.areaheight-self.ballLen): #ball hit bottom of game area
                ydir =1
            if self.yball <= 0: #ball hit top of game area
                ydir =1
            
            self.xball = self.xball + (xdir*xspeed)
            self.yball = self.yball + (ydir*yspeed)
