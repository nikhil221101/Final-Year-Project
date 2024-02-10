import base64
import hashlib
from AESCipher import AESCipher
from PIL import Image
from random import randint
from imagegen import gen_ran
class Decrypter:
    def __init__(self, cipher,filePath):
        self.cipher = cipher
        self.filePath=filePath
    def decrypt_image(self,k):
        #key = self.get_key_from_image()
        key = k
        cipher = self.cipher
        aes = AESCipher(key)
        filename=self.filePath.rstrip("cipher.txt").split("/")[-1]
        try:
            base64_decoded = aes.decrypt(cipher)
        except:
            print("Error in downloading the data")  
            gen_ran("C:/Users/ashwi/Downloads/"+filename)
            return None
              #print(type(base64_decoded))
       
        fh = open("C:/Users/ashwi/Downloads/"+filename, "wb")
        fh.write(base64.b64decode(base64_decoded))
        #fh.write(base64_decoded.decode('base64'))
        fh.close() 
        print("Image Saved")
        return (base64.b64decode(base64_decoded))
        



