import sys
import main
print("Hello World Im in python lmao") 
object=main.decrypt_page(sys.argv[3])

filePath="D:/BE_Project/Image-Encryption-using-AES-master/node_trials/USER_DATABASE/"+sys.argv[3]+"/"+sys.argv[1]+"cipher.txt"
object.chooseFile1(filePath)
object.onClickDecrypt(sys.argv[2])
print("Hello World Im in python lmao")
