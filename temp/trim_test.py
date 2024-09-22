
# TODO:
# trim static variables
# trim curses
# trim items
# trim vault
# trim companions

import json
import re

with open('temp/test_actual_save.json', 'r') as file:
	data  = json.loads(file.read())

# parse item arrays
def parse_item_array(vault_items) -> None:
	if isinstance(vault_items[0], int):
		vault_items = vault_items[1]
	
	if isinstance(vault_items[0], int):
		vault_items = vault_items[1]

	for value in vault_items:
		if isinstance(value, dict) and value['count'] == 0:
			vault_items.remove(value)

# def trim_companions(hired : list[str], companions : list) -> None:
# 	pass

# parse each delta state
def parse_state_delta(delta):
	for item in delta:

		item['variables'].pop("relics", None)
		item['variables'].pop("companions", None)

		# if item['variables'].get("vaultItems"):
		# 	parse_item_array(item['variables']["vaultItems"])

		# if item['variables'].get("items"):
		# 	parse_item_array(item['variables']["items"])

		keyz = list(item['variables'].keys())
		for key in keyz:
			# any curse#, relic#, item# are removed
			if re.match("curse\d+", key) or re.match("relic\d+", key) or re.match("item\d+", key):
				item['variables'].pop(key, None)

			if "companion" in key and key != "companions":
				item['variables'].pop(key, None)

# iterate each save slot
for slot in data['slots']:
	if slot is None:
		continue
	if slot.get('state') is None:
		continue
	if slot['state'].get('delta') is None:
		continue
	parse_state_delta(slot['state']['delta'])

# write to file
with open('temp/test_actual_save_trimmed.json', 'w') as file:
	file.write(json.dumps(data,indent=4))
