import sys
import main
print("Hello World Im in python lmao") 
object=main.encrypt_page(sys.argv[3])


object.chooseFile(sys.argv[1])
object.onClickEncrypt(sys.argv[2])

print("Hello World Im in python lmao")




file_name=str.split("/")[-1]
print(file_name)



# fh = open("USER_DATABASE/ash/cipher.txt", "w")
# fh.write("HEllo")
# fh.close()