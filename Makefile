install:
	yarn install

format:
	yarn run prettier --write .

format.check:
	yarn run prettier --check .

lint:
	yarn run eslint .

lint.fix:
	yarn run eslint --fix .

autofix: format lint.fix

dev: install
	WEBPACK_ENV=development yarn run webpack --watch

build: install clear
	WEBPACK_ENV=production yarn run webpack

clear: install
	yarn run rimraf build

version.update:
	@./bin/version-update.sh
