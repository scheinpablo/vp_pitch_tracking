import requests
from time import sleep
url = 'https://www2.spsc.tugraz.at/databases/PTDB-TUG/SPEECH DATA/FEMALE/REF/F01/ref_F01_si{}.f0'
filename = 'ref_F01_si{}.f0'
print(requests.get(url.format(453)))
input()
for i in range(453,500):
    r = requests.get(url.format(i))
    with open(filename.format(i), "wb+") as f:
        f.write(r.content)
    sleep(1)
    