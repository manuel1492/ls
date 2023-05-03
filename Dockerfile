# Se utiliza la imagen base de Alpine
FROM alpine:latest

# Se actualiza la lista de paquetes disponibles
RUN apk update

# Se instala Python 3 y pip
RUN apk add python3 \
    py3-pip \
    nodejs \
    yarn \
    git \
    cmake \
    make \
    gcc \
    g++ 

# Se establece el directorio de trabajo
WORKDIR /app

# Se copia todo el contenido del directorio actual al directorio de trabajo (en la imagen de Docker)
COPY . .
RUN cd /app && yarn
RUN git clone https://github.com/HirCoir/alpaca.cppp && \
    cd llama.cpp/ && \
    wget https://huggingface.co/CRD716/ggml-vicuna-1.1-quantized/blob/main/ggml-vicuna-7b-1.1-q4_0.bin && \
    cd llama.cpp/ && \
    make -j...

# Se establece el comando a ejecutar por defecto
CMD ["yarn", "example"]
