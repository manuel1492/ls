#e utiliza la imagen base de Alpine
FROM alpine:latest

# Se actualiza la lista de paquetes disponibles
RUN apk update

# Se instala Python 3 y pip
RUN apk add nodejs \
    yarn \
    git \
    cmake \
    make \
    gcc \
    g++ \
    unzip \
    wget \
     bash


RUN git clone https://github.com/HirCoir/Baileys.cpp
RUN mv Baileys.cpp /app
WORKDIR /app
RUN yarn
RUN git clone https://github.com/ggerganov/llama.cpp/
RUN cd llama.cpp && make -j
RUN cd llama.cpp && wget https://huggingface.co/CRD716/ggml-vicuna-1.1-quantized/resolve/main/ggml-vicuna-7b-1.1-q4_0.bin
# Se establece el comando a ejecutar por defecto
CMD ["yarn", "example"]
