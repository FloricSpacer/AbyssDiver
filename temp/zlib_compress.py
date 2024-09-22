
import zlib

with open('temp/trimmed.txt', 'rb') as file:
	byte_data = file.read()

compressed = zlib.compress(byte_data, level=-1)

with open('temp/zlib_trimmed.txt', 'wb') as file:
	file.write(compressed)
