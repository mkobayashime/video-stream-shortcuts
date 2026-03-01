biome = bunx biome
eslint = bunx eslint
typecheck = bunx tsc --noEmit
wxt = bunx wxt

deps: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: deps PHONY
	$(biome) check .
	$(eslint) .

lint.fix: deps PHONY
	$(biome) check --fix .
	$(eslint) --fix .

typecheck: deps PHONY
	$(typecheck)

typecheck.watch: deps PHONY
	$(typecheck) --watch

dev: deps PHONY
	$(wxt)

build: deps PHONY
	$(wxt) build

zip: deps PHONY
	$(wxt) zip

PHONY:
