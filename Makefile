ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

yarn-build:
	yarn
	yarn build

build: yarn-build
	docker build -t codex:0.1.0 .

compose:
	docker-compose -f ./docker/docker-compose.yml --project-directory ./ up -d
	@sleep 3

compose-down:
	docker-compose -f ./docker/docker-compose.yml --project-directory ./ down

init-db: 
	CID="$(shell docker ps | grep postgres | awk '{print $$1}')"; docker exec $$CID /tmp/init-db.sh
	
run: build compose init-db