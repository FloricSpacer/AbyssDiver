


import json

with open('temp/raw_save.json', 'r') as file:
	data  = json.loads(file.read())

for slot in data['slots']:
	if slot is None:
		continue
	if slot.get('state') is None:
		continue
	if slot['state'].get('delta') is None:
		continue
	for item in slot['state']['delta']:
		keyz = list(item['variables'].keys())
		for key in keyz:
			if "curse" in key:
				item['variables'].pop(key, None)

with open('temp/trimmed.json', 'w') as file:
	file.write(json.dumps(data,indent=4))
