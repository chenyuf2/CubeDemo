import json
from collections import defaultdict
def removecopy(data):
	dic = {}
	for i in range(0,len(data)):
		if data[i] not in dic:
			dic[data[i]] = data[i]
	fin = []
	for i in dic:
		fin.append(i)
	return fin
f=open('phrase_text_700_code.json')
docs= json.load(f)
time = json.load(open('times.json'))
location = json.load(open('locations.json'))
topics = json.load(open('topics_new.json'))
print(f"{len(docs)} {len(time)} {len(location)} {len(topics)}")
time_loc_topic = defaultdict(dict)
print(enumerate(docs))
for i,doc in enumerate(docs):
	print(i,doc)
	t = time[i][:-3]
	if t not in time_loc_topic:
		time_loc_topic[t] = defaultdict(dict)
	if doc not in location:
		print(doc)
		continue
	location_list = location[doc]
	location_list = removecopy(location_list)
	for loc in location_list:
		if loc not in time_loc_topic[t]:
			time_loc_topic[t][loc] = defaultdict(int)
		time_loc_topic[t][loc][topics[i].split('\t')[-1]] += 1

fout=open('cell_doc_num.json','w')
json.dump(time_loc_topic,fout)
