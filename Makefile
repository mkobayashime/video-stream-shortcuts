eslint = yarn run eslint --ignore-path .gitignore
prettier = yarn run prettier --ignore-path .gitignore

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

dev: install
	WEBPACK_ENV=development yarn run webpack --watch

build: install clear
	WEBPACK_ENV=production yarn run webpack

clear: install
	yarn run rimraf build

version.update:
	@./bin/version-update.sh
