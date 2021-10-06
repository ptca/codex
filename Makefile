ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

all: run

bin: 
	docker run -it --rm \
		-v "$(ROOT_DIR):/sb" \
		-w "/sb" \
		golang:1.17.1-alpine3.14 sh -c "go build -o bin/alice" .

build: bin
	docker build -t alice:0.1.0 .


