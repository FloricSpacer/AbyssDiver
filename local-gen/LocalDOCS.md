
## Resources

- (ComfyUI GitHub) https://github.com/comfyanonymous/ComfyUI
- (ComfyUI-Zluda GitHub) https://github.com/patientx/ComfyUI-Zluda

- (PonyXL Checkpoint) https://civitai.com/models/376031/hassaku-xl-pony
- (PonyXL LORA) https://civitai.com/models/481529/dall-e-3-anime-style-pony

- (RemBG ComfyUI Node) https://github.com/john-mnz/ComfyUI-Inspyrenet-Rembg

## Virus Total

8th December 2024

one-click-comfyui.bat (BATCH)
https://www.virustotal.com/gui/file/55fb632be3af05c75b9758d21402af77466c440f7d96408b3963bac03370c833

one-click-comfyui.sh (BASH)
https://www.virustotal.com/gui/file/d5f479f11f3d095e3a5678aabea3dc467e6a8d087cc0b61f4812a73818c11630

install_git_python.bat (BATCH)
https://www.virustotal.com/gui/file/55fb632be3af05c75b9758d21402af77466c440f7d96408b3963bac03370c833

installer.py  (PYTHON)
https://www.virustotal.com/gui/file/55fb632be3af05c75b9758d21402af77466c440f7d96408b3963bac03370c833

uninstall-comfyui.bat (BATCH)
https://www.virustotal.com/gui/file/eaed707ff48f1cae78c708b0c4adab7fd6294279000e35676621c9d7adf4c3ae

uninstall-comfyui.sh (BASH)
https://www.virustotal.com/gui/file/eaed707ff48f1cae78c708b0c4adab7fd6294279000e35676621c9d7adf4c3ae

uninstaller.py (PYTHON)
https://www.virustotal.com/gui/file/eaed707ff48f1cae78c708b0c4adab7fd6294279000e35676621c9d7adf4c3ae

proxy.py (PYTHON)
https://www.virustotal.com/gui/file/a087b0c9aa7e4b610f5ade40ca4276f3f640a0428d1c2d850b9a15170233eb02

all files together
https://www.virustotal.com/gui/file/54c08e7e88ef16a10700687391b4647414de87322d212e67866fceab7deaf1ae

## Using Custom ComfyUI

To use a custom instance of ComfyUI (for those that manually setup different version of ComfyUI with other support), simply run your custom comfyui instance, then run the proxy.py seperately using a command prompt or such.

You will need the following packages using pip as well: `tqdm requests fastapi pydantic pillow websocket-client aiohttp uvicorn websockets`

Finally, make sure to have the ComfyUI-Inspyrenet-Rembg custom node installed by john-mnz.

Steps:
1. Run ComfyUI
2. Go to ComfyUI-Manager
3. Custom Nodes Manager
4. Install the "ComfyUI-Inspyrenet-Rembg" node
5. Restart ComfyUI
6. Open a new terminal in the local-gen folder
7. Run `pip install tqdm requests fastapi pydantic pillow websocket-client aiohttp uvicorn websockets`
8. Run `python proxy.py` in the local-gen folder

## Troubleshoot

*You can check what python commands are working using the following individual commands:*
1. `py --version`
2. `python --version`
3. `python3 --version`
4. `python3.10 --version`

### Essentials
1. *DO NOT USE THE WINDOWS STORE PYTHON*
2. *DO NOT INSTALL PYTHON IN PROGRAM FILES / PROGRAM FILES (x86)*
3. *USE THE MOST UP-TO-DATE VERSION OF THE GAME*

### Select a different GPU using the command line argument "--cuda-device N"
1. Open task manager and go to the performance tab
2. Scroll down till you see your GPUs
3. GPU 0 = `--cuda-device 0`, GPU 1 = `--cuda-device 1`, etc
4. Head to line ~122 in the `installer.py` and find the `CUSTOM_COMMAND_LINE_ARGS_FOR_COMFYUI`
5. Add "--cuda-device N" where N is the device number that you want to use, into that list.
6. Should look like `CUSTOM_COMMAND_LINE_ARGS_FOR_COMFYUI = ["--cuda-device 0"]`
7. Start ComfyUI again

### Terminal Errors:

### TypeError: unsupported operand type(s) for |: 'types.Generic'....
1. You likely have a python version below 3.10.X
2. Upgrade your python version to 3.10.X or 3.11.X and retry. Recommended is 3.11.X.

### "Python cannot find the file specified...."
1. Look in the terminal for the PATH to the ABYSS DIVER folder
2. Move the folder in a location with NO SPACES!
3. Delete the venv folder in tools/ComfyUI
4. Launch the one-click-comfyui.bat

### "Failed to find main.py"
1. Delete the "ComfyUI" folder and head to the ComfyUI GitHub repository
2. Download the latest SOURCE CODE RELEASE FILE
3. Extract the folder in the zip file to the local-gen/tools folder
4. Rename the ComfyUI-X.X.X to ComfyUI
5. Run the one-click-comfyui.bat

### "OSError: [WinError 126] The specified module could not be found. ..... Lib\site-packages\torch\lib\caffe2_nvrtc.dll" or one of its dependencies."
1. Repeat all the dependency installation steps as asked by the installer at https://github.com/patientx/ComfyUI-Zluda?tab=readme-ov-file#dependencies
2. Make sure you have done them all correctly and reboot
3. If still unsuccessful, ask for help in the discord server.

### "'Python is not installed, installing now silently.' keeps failing over and over with 'curl not found'"
1. You can manually install python at https://www.python.org/downloads/release/python-3119/
2. OR Install curl manually then re-open the file.

#### "Exception No suitable Python version is installed..."
1. Uninstall any versions of python that are not Python 3.11.X or 3.10.X (use the commands above in a terminal)
2. Install Python 3.11.X on the webpage https://www.python.org/downloads/release/python-3119/ if either 3.11.X or 3.10.X is not already installed
3. Restart the one-click-comfyui file.

#### "Command failed with code XXXXXXXXXX ... venv/Scripts/python.exe ... --lowvram"
1. Close any running one-click-comfyui terminals
2. Delete the "venv" folder in "local-gen/tools/ComfyUI"
3. Restart the one-click-comfyui file.

#### "WARNING: Ignoring invalid distribution ~~p (PATH_TO_PYTHON\Lib\site-packages)"
1. Uninstall the version of python that is throwing this error
2. Reinstall the python version if you need it (use either 3.10.X or 3.11.X).
3. Restart the one-click-comfyui file.

#### "Error while deserializing header: MetadataIncompleteBuffer"
1. Head to "local-gen/tools/ComfyUI"
2. In the models/checkpoints, delete the hassakuXL model
3. In the models/loras, delete the dalle magik model
4. Restart the one-click-comfyui file and let it download the files again.

#### "Failed to activate virtual environment"
1. Close any running one-click-comfyui terminals
2. Delete the "venv" folder in "local-gen/tools/ComfyUI"
3. Restart the one-click-comfyui file.

#### "'Unable to connect to ComfyUI' even when the terminal says you should be able to"
1. Disable any adblocks OR whitelist the file.

#### "Torch not build with CUDA enabled"
1. When the prompt asks you if you have a NVIDIA gpu, enter YES
2. When the prompt asks you what version of cuda do you have, follow the instructions to find the version.
3. When the prompt asks if you have a older GPU, and you have a GPU older than the 1060, enter YES.
4. If the above steps do not work, delete the "venv" folder and repeat, otherwise join the discord and head to #local-image-gen-help.

#### "'Cuda Error' of any type"
1. If you are using an OLDER gpu than the 1060, make sure to put YES for the "older gpu" prompt when opening the one-click-comfyui.bat.
2. You may need to install or upgrade your CUDA toolkit found on the page https://developer.nvidia.com/cuda-downloads
3. Try uninstall and reinstall cuda.
4. If none of the above work, please join the discord and head to #local-image-gen-help.

## Forcing Specific Python Versions / Filepaths

![Force Python Command or Filepath](force_python_replacement.png)

You can replace the `def get_python_and_version() -> tuple[str, str]:`
function with the following in the `installer.py`:
```py
def get_python_and_version() -> tuple[str, str]:
	return "python", "3.11.9"
```

or if you want to specify a filepath (such as a custom conda environment)

```py
def get_python_and_version() -> tuple[str, str]:
	return "C:/Users/USERNAME/miniconda3/envs/python_3_11/Scripts/python.exe", "3.11.9"
```
