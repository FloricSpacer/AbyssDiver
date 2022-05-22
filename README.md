This is a [Tweego](https://www.motoslave.net/tweego/) conversion of an [adult Twine game](https://tfgames.site/index.php?module=viewgame&id=2653) made by FloricSpacer, which is in turn based on a CYOA by an anonymous author.

To build:
- install Git and clone this repo
- run `./build.sh` from the command line

If you want to use an already installed version of Tweego, either add it to your shell's `PATH` or set the `TWEEGO` environment variable to its location (including the name of the executable itself). Otherwise, the build script will try to automatically download a version of Tweego suitable for your operating system and use that.

Arguments given to `build.sh` are passed on to Tweego. In particular, the `-w` option is useful: this makes Tweego watch the source files and as soon as any of them changes, it rebuilds the game. In the example below, `companions.twee` was edited, triggering a rebuild:

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
