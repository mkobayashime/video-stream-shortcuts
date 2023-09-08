eslint = yarn run eslint --ignore-path .gitignore
prettier = yarn run prettier --ignore-path .gitignore
webpack = yarn run webpack
typecheck = yarn run tsc --noEmit

node_modules: package.json yarn.lock
ifeq ($(MAKE_YARN_FROZEN_LOCKFILE), 1)
	yarn install --frozen-lockfile
else
	yarn install
endif
	@touch node_modules

format: node_modules
	$(prettier) --write .

format.check: node_modules
	$(prettier) --check .

lint: node_modules
	$(eslint) .

lint.fix: node_modules
	$(eslint) --fix .

autofix: format lint.fix

typecheck: node_modules
	$(typecheck)

typecheck.watch: node_modules
	$(typecheck) --watch

dev: node_modules clear
	WEBPACK_ENV=development $(webpack) --watch

build: node_modules clear
	WEBPACK_ENV=production $(webpack)

clear: node_modules
	yarn run rimraf build

version.update:
	@./bin/version-update.sh
