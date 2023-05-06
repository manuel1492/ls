
# Baileys.cpp 
![Baileys.cpp](https://raw.githubusercontent.com/HirCoir/Baileys.cpp/master/Baileys.cpp.jpg)

## Spanish
Baileys.cpp es un pequeño fork de Llama.cpp y Baileys para poder tener un Whatsapp Bot usando un modelo de Inteligencia Artificial Vicuna. Usando el proyecto Llama.cpp como base, que a su vez es una versión compilada de Large Language Model Meta AI, Baileys.cpp le permite crear WhatsApp Bots con facilidad.

## Installation 

Para instalar Baileys.cpp, simplemente clone el repositorio usando:

``` 
git clone https://github.com/HirCoir/Baileys.cpp
``` 
Para definir el número máximo de solicitudes simultáneas que puede procesar el bot (modelo Llama.cpp), debes editar el archivo example.ts que se encuentra en la carpeta Example, donde editarás el valor de "const maxProcesses=1;" donde el valor predeterminado es 1.

Una vez dentro del directorio, crea el contenedor docker ejecutando:

``` 
docker build -t baileys_cpp .
``` 

Alternativamente, puede instalarlo manualmente en su servidor clonando los siguientes repositorios:

- Llama.cpp: https://github.com/ggerganov/llama.cpp 
- Baileys: https://github.com/adiwajshing/Baileys 

Luego, instala las dependencias necesarias: `cmake make gcc g++ git`, `nodejs 18` y `yarn` usando:

```
sudo apt-get install cmake make gcc g++ git -y
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g yarn
```

Dentro de la carpeta `Baileys.cpp`, ejecuta el siguiente comando para instalar las dependencias requeridas:

```
cd Baileys.cpp
yarn
``` 

Luego, descargue el modelo Vicuna de https://huggingface.co/CRD716/ggml-vicuna-1.1-quantized/blob/main/ggml-vicuna-7b-1.1-q4_0.bin haciendo clic en Descargar y muévalo a ` carpeta llama.cpp`. Asegúrese de que la carpeta `llama.cpp` esté dentro de la carpeta `Baileys.cpp`.

Para definir el número máximo de solicitudes simultáneas que puede procesar el bot (modelo Llama.cpp), debes editar el archivo example.ts que se encuentra en la carpeta Example, donde editarás el valor de "const maxProcesses=1;" donde el valor predeterminado es 1.

Finalmente, para iniciar el bot, ejecute:

``` 
yarn example
``` 

¡Escanee el código QR generado y comience a usar el bot!

## Características 

* Baileys.cpp utiliza un modelo entrenado con 13 mil millones de parámetros, con un peso de hasta 4 GB. El modelo admite más de 20 idiomas diferentes. También tiene la opción de agregar números de WhatsApp a la lista de ignorados. Cuando se recibe un mensaje, el bot verificará si la persona está en la lista de ignorados y la ignorará si lo está.

* También puede agregar un contexto o crear una personalidad para el bot: asígnele un nombre y defina lo que puede o no puede hacer. Para hacer esto, simplemente edite el archivo `example/example.ts`.

* Puede definir el número de ejecuciones simultáneas del bot, si recibe más solicitudes de las que tiene permitido este en su lugar devolverá un mensaje al usuario diciendo que está ocupado procesando la información de otro usuario.

Tenga en cuenta que este proyecto es solo una idea y puede no tener un desarrollo futuro.

## Compatibility 

Baileys.cpp has been tested on ARM Ampere A1 with 24GB RAM.

## English

Baileys.cpp is a small fork of Llama.cpp and Baileys to be able to have a Whatsapp Bot using a Vicuna Artificial Intelligence model. Using the Llama.cpp project as a base, which in turn is a compiled version of Large Language Model Meta AI, Baileys.cpp allows you to create WhatsApp Bots with ease. 

## Features 

* Baileys.cpp uses a model trained with 13 Billion parameters, weighing up to 4GB. The model supports more than 20 different languages. You also have the option to add WhatsApp numbers to the ignore list. When a message is received, the bot will check if the person is on the ignore list and ignore them if they are. 

* You can also add a context or create a personality for the bot - give it a name and define what it can or cannot do. To do this, simply edit the `example/example.ts` file. 

* You can define the number of simultaneous executions of the bot, if it receives more requests than it is allowed it will instead return a message to the user saying that it is busy processing the information of another user.

Please note that this project is only an idea and may not have future development. 

## Compatibility 

Baileys.cpp has been tested on ARM Ampere A1 with 24GB RAM.

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
