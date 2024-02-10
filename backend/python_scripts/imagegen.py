import numpy as np
import cv2

# Set the width and height of the image
def gen_ran(file_name):     
    width = 500
    height = 500

    # Create a random image array
    random_image = np.random.randint(0, 256, (height, width, 3), dtype=np.uint8)

    # Save the random image
    cv2.imwrite(file_name, random_image)

    print("Random image saved as random_image.png")