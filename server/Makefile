.PHONY: dev
dev:
	$(call _info, "\nСтарт express-сервера");
	npm run dev
.PHONY: drop
postgres:
	$(call _warning, "\Старт Postgres'a");
	docker-compose up pg_db
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
