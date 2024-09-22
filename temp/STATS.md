
ZLIB STATS:
1. uncompressed untrimmed empty save (649KB, 13k lines)
2. uncompressed trimmed empty save (338KB, 854 lines)
2. compressed untrimmed empty save (44KB, 377 lines)
3. compressed trimmed empty save (26KB, 213 lines)

UNTRIMMED SAVE: 7103 LINES
TRIMMED SAVE: 854 LINES (relics, items, companions, curses, +static definitions of those)



```
SAVING:
1. read save file
2. get all relics/items/vaultItems/companions/curses that are UNLOCKED/HAS QUANTITY/ARE NOT DEFAULT
3. write to the "save data"

LOADING:
1. create blank save
2. overwrite properties from save data to that blank save
    i. custom handlers for relics, items, companions, curses, vaultItems
```
