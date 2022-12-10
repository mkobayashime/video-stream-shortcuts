eslint = yarn run eslint --ignore-path .gitignore
prettier = yarn run prettier --ignore-path .gitignore
webpack = yarn run webpack
typecheck = yarn run tsc --noEmit

install:
	yarn install

format:
	$(prettier) --write .

format.check:
	$(prettier) --check .

lint:
	$(eslint) .

lint.fix:
	$(eslint) --fix .

autofix: format lint.fix

typecheck: install
	$(typecheck)

typecheck.watch: install
	$(typecheck) --watch

dev: install
	WEBPACK_ENV=development $(webpack) --watch

build: install clear
	WEBPACK_ENV=production $(webpack)

clear: install
	yarn run rimraf build

version.update:
	@./bin/version-update.sh
