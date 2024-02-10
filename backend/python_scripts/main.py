from PyQt5 import QtCore,QtGui
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5.QtWidgets import QFileDialog,QLabel,QAction,QMainWindow,QApplication
from PyQt5.uic import loadUiType
from Encrypter import Encrypter
from Decrypter import Decrypter
from PIL import Image as Img
from PIL import ImageTk as ImgTk
#from tkinter import *
import base64
from Crypto.Cipher import AES
import os
import sys
from imagegen import gen_ran
#import tkinter
#import tkinter.filedialog as tkFileDialog
Qt = QtCore.Qt



    
class encrypt_page():
    def __init__(self,user):
        self.file=""
        self.stri=""
        self.user=user
        self.file_name=""
        # self.pushButton_3.clicked.connect(self.chooseFile)
        # self.pushButton_4.clicked.connect(self.onClickEncrypt)
    def Handel_Buttons(self):
        self.pushButton.clicked.connect(lambda: self.stackedWidget.setCurrentIndex(1))
    def chooseFile(self,fileData):
        self.file = fileData
        self.file_name = self.file.split("/")[-1]
        image = QtGui.QImage(self.file)
      
        if self.file != None:
            ba = QtCore.QByteArray()
            buff = QtCore.QBuffer(ba)
            
            buff.open(QtCore.QIODevice.WriteOnly) 
            image.save(buff, "PNG")
            pixmap_bytes = ba.data()

            self.stri = base64.b64encode(pixmap_bytes)
            print("Hello world")
        
    def onClickEncrypt(self,key):
        myKey=key
        x = Encrypter(self.stri, myKey)
        cipher = x.encrypt_image()
        fh = open("USER_DATABASE/"+self.user+"/"+self.file_name+"cipher.txt", "wb")
        fh.write(cipher)
        fh.close()
  
        
class decrypt_page():
    def __init__(self,user):
        self.cipher={} 
        self.user=user
        self.file=""   #cipher file path
    
    def chooseFile1(self,file_input):
        self.file = file_input
        try:
            text=open(self.file).read()
        except:
            filename=self.file.rstrip("cipher.txt").split("/")[-1]
            print("Error in downloading the data")
            gen_ran("C:/Users/ashwi/Downloads/"+filename)
            return 


        #print(text.encode('utf-8'))
        self.cipher= text.encode('utf-8')
    def onClickDecrypt(self,key):
        myKey=key
        x = Decrypter(self.cipher,self.file)
        image=x.decrypt_image(myKey)
        
        # ba = QtCore.QByteArray(image)
        # pixmap = QtGui.QPixmap()
        # ok = pixmap.loadFromData(ba, "PNG")
        # assert ok        
        # self.lbl_2.setPixmap(pixmap.scaledToHeight(201))
        # if image!=None:
        #     ba = QtCore.QByteArray()
        #     buff = QtCore.QBuffer(ba)
        #     buff.open(QtCore.QIODevice.WriteOnly) 
        #     ok = pixmap.save(buff, "PNG")
        #     assert ok
        #     pixmap_bytes = ba.data()
        #     #print(type(pixmap_bytes))
        #     #data = self.file[0]
        #     self.stri = base64.b64encode(pixmap_bytes)            
        
# class Main_Window(QMainWindow, QWidget, ui,encrypt_page,decrypt_page):
    # def __init__(self):
        # encrypt_page.__init__(self)
        # decrypt_page.__init__(self)

        # self.Handel_Buttons() 
        # self.stackedWidget.setCurrentIndex(0)
    def Handel_Buttons(self):
        self.pushButton.clicked.connect(lambda: self.stackedWidget.setCurrentIndex(1))
        self.pushButton_2.clicked.connect(lambda: self.stackedWidget.setCurrentIndex(2))
        self.pushButton_8.clicked.connect(lambda: self.stackedWidget.setCurrentIndex(0))
        self.pushButton_7.clicked.connect(lambda: self.stackedWidget.setCurrentIndex(0))
                
# if __name__ == '__main__':
#     app = QApplication(sys.argv)
#     #connect()
#     window = start()
#     app.exec_()