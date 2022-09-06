.PHONY: dev
dev:
	$(call _info, "\nСтарт express-сервера");
	go run main.go
.PHONY: drop
postgres:
	$(call _warning, "\Старт Postgres'a");
	docker-compose up pg_db
.PHONY: build
build:
	go build -v ./cmd/apiserver
.PHONY: test
test:
	go test -v -race -timeout 30s ./...
.DEFAULT_GOAL := build
define _info
	$(call _echoColor, $1, 6)
endef

define _warning
	$(call _echoColor, $1, 1)
endef

define _echoColor
	@tput setaf $2
	@echo $1
	@tput sgr0
endef
