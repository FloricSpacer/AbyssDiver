
# Models And Nodes

- (PonyXL Checkpoint) https://civitai.com/models/376031/hassaku-xl-pony
- (PonyXL LORA) https://civitai.com/models/481529/dall-e-3-anime-style-pony

- (RemBG ComfyUI Node) https://github.com/john-mnz/ComfyUI-Inspyrenet-Rembg

# Using Custom ComfyUI

To use a custom instance of ComfyUI (for those that manually setup different version of ComfyUI with other support), simply run your custom comfyui instance, then run the proxy.py seperately using a command prompt or such.

You will need the following packages using pip as well: `tqdm requests fastapi pydantic pillow websocket-client aiohttp uvicorn websockets`

Finally, make sure to have the ComfyUI-Inspyrenet-Rembg custom node installed by john-mnz.

Steps:
1. Run ComfyUI
2. Go to ComfyUI-Manager
3. Custom Nodes Manager
4. Install the "ComfyUI-Inspyrenet-Rembg" node
5. Restart ComfyUI
6. Open a new terminal
7. Run `pip install tqdm requests fastapi pydantic pillow websocket-client aiohttp uvicorn websockets`
8. Run `python proxy.py` in the local-gen folder

# Troubleshoot

1.
