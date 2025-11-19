biome = bunx biome
webpack = bunx webpack
typecheck = bunx tsc --noEmit

node_modules: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: node_modules PHONY
	$(biome) check .

lint.fix: node_modules PHONY
	$(biome) check --write .

autofix: format lint.fix PHONY

typecheck: node_modules PHONY
	$(typecheck)

typecheck.watch: node_modules PHONY
	$(typecheck) --watch

dev: node_modules clear PHONY
	WEBPACK_ENV=development $(webpack) --watch

build: node_modules clear PHONY
	WEBPACK_ENV=production $(webpack)

clear: node_modules PHONY
	bunx rimraf build

version.update: PHONY
	@./bin/version-update.sh

PHONY:
