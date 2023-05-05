# Baileys.cpp 
![Baileys.cpp](https://raw.githubusercontent.com/HirCoir/Baileys.cpp/master/Baileys.cpp.jpg)

Baileys.cpp is a small fork of Llama.cpp and Baileys to be able to have a Whatsapp Bot using a Vicuna Artificial Intelligence model. Using the Llama.cpp project as a base, which in turn is a compiled version of Large Language Model Meta AI, Baileys.cpp allows you to create WhatsApp Bots with ease. 

## Installation 

To install Baileys.cpp, simply clone the repository using: 

``` 
git clone https://github.com/HirCoir/Baileys.cpp
``` 
To define the maximum number of simultaneous requests that the bot can process (Llama.cpp model), you must edit the example.ts file that is in the Example folder, where you will edit the value of "const maxProcesses = 1;" where the default is 1.

Once inside the directory, build the docker container by running: 

``` 
docker build -t baileys_cpp .
``` 

Alternatively, you can install it manually on your server by cloning the following repositories: 

- Llama.cpp: https://github.com/ggerganov/llama.cpp 
- Baileys: https://github.com/adiwajshing/Baileys 

Next, install the necessary dependencies: `cmake make gcc g++ git`, `nodejs 18` and `yarn` using: 

```
sudo apt-get install cmake make gcc g++ git -y
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g yarn
```

Inside the `Baileys.cpp` folder, run the following command to install the required dependencies: 

```
cd Baileys.cpp
yarn
``` 

Then, download the Vicuna model from https://huggingface.co/CRD716/ggml-vicuna-1.1-quantized/blob/main/ggml-vicuna-7b-1.1-q4_0.bin by clicking on Download and move it to the `llama.cpp` folder. Ensure the `llama.cpp` folder is within the `Baileys.cpp` folder.  

To define the maximum number of simultaneous requests that the bot can process (Llama.cpp model), you must edit the example.ts file that is in the Example folder, where you will edit the value of "const maxProcesses = 1;" where the default is 1.

Finally, to start the bot, run: 

``` 
yarn example
``` 

Scan the generated QR code and start using the bot! 

## Features 

Baileys.cpp uses a model trained with 13 Billion parameters, weighing up to 4GB. The model supports more than 20 different languages. You also have the option to add WhatsApp numbers to the ignore list. When a message is received, the bot will check if the person is on the ignore list and ignore them if they are. 

You can also add a context or create a personality for the bot - give it a name and define what it can or cannot do. To do this, simply edit the `example/example.ts` file. 

Please note that this project is only an idea and may not have future development. 

## Compatibility 

Baileys.cpp has been tested on ARM Ampere A1 with 24GB RAM.
