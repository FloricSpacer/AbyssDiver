
This is a [Tweego](https://www.motoslave.net/tweego/) conversion of an [adult Twine game](https://tfgames.site/index.php?module=viewgame&id=2653) made by FloricSpacer, which is in turn based on a CYOA by an anonymous author.

## Developers

### Tweego

If you don't have *Tweego* installed, it will automatically be downloaded by the build script to be used when building the game.

If you have a custom version of *Tweego* installed on your system, to use it in the build process for the Abyss Diver game, add it to your shell's `PATH` or  use the `TWEEGO` environment variable. Note when using the environment variable, include the file extension in the absolute path of the executable file.

### Abyss Diver Development

Download the repository:
- Install **git** from https://git-scm.com/downloads.
- Clone this repository using `git clone`.

Build the game:
- For Linux, run `build.sh` from the command line.
- For Windows, run `build.bat` from the command line.
- Play using the **AbyssDiver.html** html file.

It is recommended to join the discord server so you can receive the latest game assets for your develoment environment and any additional help you may need from fellow developers.

Arguments given to `build.sh` or `build.bat` are passed on to Tweego.
In particular, the `-w` option is useful: this makes Tweego watch the source files and as soon as any of them changes, it rebuilds the game. In the example below, `companions.twee` was edited, triggering a rebuild:

```
$ ./build.sh -w
Using downloaded Tweego: tools/tweego
Compiling to: Abyss Diver.html

Watch mode started.  Press CTRL+C to stop.

Recursively watched paths: 1
  src

BUILDING: Abyss Diver.html
WRITE: src/companions.twee
BUILDING: Abyss Diver.html
```

### Local Image Generation

For those wanting local image generation, you can utilize the "one-click installer" batch/bash files to download ComfyUI and checkpoints to run it locally.
The file is located in the "local-gen" folder in the root directory of the game, and there is additional instructions within the terminal so watch for those.
