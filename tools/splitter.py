#!/usr/bin/env python3

from collections import defaultdict
import json
import re

def parse_header(line):
    assert line.startswith("::")
    i = 2
    name_chars = []
    tag_chars = []
    chars = name_chars
    while i < len(line):
        ch = line[i]
        i += 1
        if ch == "[":
            assert chars is name_chars
            chars = tag_chars
        elif ch == "]":
            break
        elif ch == "{":
            i -= 1
            break
        elif ch == "\\":
            ch = line[i]
            i += 1
        chars.append(ch)

    name = "".join(name_chars).strip()
    tags = "".join(tag_chars[1:]).split()
    if i == len(line):
        metadata = {}
    else:
        metadata = json.loads(line[i:])

    return name, tags, metadata


def split_passages(lines):
    header = None
    body = []
    for line in lines:
        line = line.rstrip()
        if line.startswith("::"):
            if header is not None:
                yield header, body
            header = parse_header(line)
            body = []
        else:
            body.append(line)
    if header is not None:
        yield header, body


def classify_passage(name, tags, metadata):
    if name in ("StoryTitle", "StoryCaption", "StoryAuthor", "StoryData"):
        return "metadata.twee"

    if name == "StoryInit":
        return "init.twee"

    if name == "Story JavaScript":
        return "script.js"

    if "stylesheet" in tags:
        return "stylesheet.css"

    if "widget" in tags:
        return "widgets.twee"

    for tag in tags:
        if tag in ("start", "surface") or tag.startswith("layer"):
            return f"{tag}.twee"

    if name.startswith("Layer"):
        return name[:6].lower() + ".twee"

    return "global.twee"


def escape(s):
    s = s.replace("\\", "\\\\")
    s = s.replace("[", "\\[").replace("]", "\\]")
    s = s.replace("{", "\\{").replace("}", "\\}")
    return s


def split_file(path):
    passages_by_filename = defaultdict(list)
    with open(path, "r") as f:
        for header, body in split_passages(f):
            filename = classify_passage(*header)
            while body and not body[-1]:
                del body[-1]
            passages_by_filename[filename].append((header, body))

    for filename, passages in passages_by_filename.items():
        print(f"Writing: {filename}")
        first = True
        with open(f"src/{filename}", "w") as out:
            for (name, tags, metadata), body in passages:
                if first:
                    first = False
                else:
                    print("", file=out)
                    print("", file=out)
                if filename.endswith(".twee"):
                    tags = set(tags)
                    tags.discard("new")
                    tags.discard("altered")
                    if tags:
                        tags_str = " ".join(escape(tag) for tag in sorted(tags))
                        print(f":: {escape(name)} [{tags_str}]", file=out)
                    else:
                        print(f":: {escape(name)}", file=out)
                for line in body:
                    print(line, file=out)
                

if __name__ == "__main__":
    split_file("all.twee")
