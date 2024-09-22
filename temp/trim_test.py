
# TODO:
# trim static variables
# trim curses
# trim items
# trim vault
# trim companions

from collections import defaultdict

import json
import re

with open('temp/untrimmed.txt', 'r') as file:
	data  = json.loads(file.read())

# with open('temp/untrimmed.txt', 'w') as file:
# 	file.write(json.dumps(data, indent=4))

# parse item arrays
def parse_item_array(vault_items) -> None:
	if isinstance(vault_items[0], int):
		vault_items = vault_items[1]
	if isinstance(vault_items[0], int):
		vault_items = vault_items[1]

	for value in vault_items:
		if isinstance(value, dict) and value['count'] == 0:
			vault_items.remove(value)

# parse each delta state
def parse_events(events, max_unique_events : int = 20) -> list:
	# start from the furthest and come back
	pruned_events = []
	event_unique_counter = defaultdict(int)
	# print(len(events))
	for item in reversed(events):
		key = item[1][0]
		if event_unique_counter[key] > max_unique_events:
			continue
		event_unique_counter[key] += 1
		pruned_events.insert(0, item)
	return pruned_events

def parse_state_delta(delta):
	for item in delta:
		# medium space saver
		item['variables'].pop("relics", None)
		item['variables'].pop("companions", None)

		# trim _events/events (HUGE SPACE SAVER)
		mc = item['variables']['mc']
		if isinstance(mc, dict):
			# normal saves
			mc['_events'][1] = parse_events(mc['_events'][1], max_unique_events=20)
		elif isinstance(mc, list):
			# autosave
			mc[1][1]['events'] = parse_events(mc[1][1]['events'], max_unique_events=20)

		# if item['variables'].get("vaultItems"):
		# 	parse_item_array(item['variables']["vaultItems"])

		# if item['variables'].get("items"):
		# 	parse_item_array(item['variables']["items"])

		# keyz = list(item['variables'].keys())
		# for key in keyz:
		# 	# any curse#, relic#, item# are removed
		# 	if re.match("curse\d+", key) or re.match("relic\d+", key) or re.match("item\d+", key):
		# 		item['variables'].pop(key, None)

		# 	if "companion" in key and key != "companions":
		# 		item['variables'].pop(key, None)

# iterate each save slot
parse_state_delta(data['autosave']['state']['delta'])
for slot in data['slots']:
	if slot is None:
		continue
	if slot.get('state') is None:
		continue
	if slot['state'].get('delta') is None:
		continue
	parse_state_delta(slot['state']['delta'])

# write to file
with open('temp/trimmed.txt', 'w') as file:
	file.write(json.dumps(data,indent=4))
