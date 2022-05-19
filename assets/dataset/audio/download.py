import requests
from time import sleep
url = 'https://www2.spsc.tugraz.at/databases/PTDB-TUG/SPEECH DATA/FEMALE/MIC/F01/mic_F01_si{}.wav'
filename = 'mic_F01_si{}.wav'
print(requests.get(url.format(453)))
input()
for i in range(453,500):
    r = requests.get(url.format(i))
    with open(filename.format(i), "wb+") as f:
        f.write(r.content)
    sleep(1)
    