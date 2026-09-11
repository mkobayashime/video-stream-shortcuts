oxlint = bunx oxlint
oxfmt = bunx oxfmt
typecheck = bunx tsc --noEmit
wxt = bunx wxt

deps: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: deps PHONY
	$(oxfmt) --check
	$(oxlint) --type-aware

lint.fix: deps PHONY
	$(oxfmt)
	$(oxlint) --fix --type-aware

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
