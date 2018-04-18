import json
from os import listdir
from os.path import isfile, join
from pathlib import Path
import os
import sys

my_file = '../../../../var/log/elasticsearch/nmkelley_index_search_slowlog.log'
mydir = '../../../../var/log/elasticsearch/'
my_real_file = Path(my_file)

if my_real_file.is_file():
	print 'exists'

data = {}
i = 0
with open(my_file, 'r') as f:
    for line in f:
    	line = line.replace('', '')
    	print line
    	data[i] = line
        i=i+1


json_data = json.dumps(data)
print(json_data)    
sys.stdout.flush()

