eslint = bunx eslint --ignore-path .gitignore
prettier = bunx prettier --ignore-path .gitignore
webpack = bunx webpack
typecheck = bunx tsc --noEmit

node_modules: PHONY
	bun install

format: node_modules PHONY
	$(prettier) --write .

format.check: node_modules PHONY
	$(prettier) --check .

lint: node_modules PHONY
	$(eslint) .

lint.fix: node_modules PHONY
	$(eslint) --fix .

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
