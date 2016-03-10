NODE_VERSION=4.2.4
NPM_VERSION=3.7.1


# below are derived properties
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Linux)
	SYS_NAME=linux
endif
ifeq ($(UNAME_S),Darwin)
	SYS_NAME=darwin
endif

# my x64 mac returns i386 to 'uname -p' :-O
UNAME_P := $(shell uname)
ifeq ($(filter x86_64,$(UNAME_P)),)
	ARCH_NAME=x64
else ifeq ($(filter %86,$(UNAME_P)),)
	ARCH_NAME=x32
endif

NODE_FILENAME=node-v$(NODE_VERSION)-$(SYS_NAME)-$(ARCH_NAME)
NPM_FILENAME=npm-$(NPM_VERSION)
NPM_EXEC=$(CURRENT_DIR)/node/node $(CURRENT_DIR)/node/npm/bin/npm-cli.js

CURRENT_DIR := $(shell pwd)

SHELL := /bin/bash
PATH := $(CURRENT_DIR)/node:$(CURRENT_DIR)/node/npm/bin:$(PATH):$(M2_HOME)/bin



log-config:
	@echo "Building for system '$(SYS_NAME)' and architecture '$(ARCH_NAME)'"

clean-node:
	rm -f $(NODE_FILENAME).tar.gz
	rm -f $(NPM_FILENAME).tgz
	rm -rf node
	rm -rf node_modules

install-node-npm: clean-node
	wget https://nodejs.org/dist/v$(NODE_VERSION)/$(NODE_FILENAME).tar.gz
	mkdir -p node
	tar -xzf $(NODE_FILENAME).tar.gz --strip=2 -C node/ $(NODE_FILENAME)/bin/node
	rm -r $(NODE_FILENAME).tar.gz
	wget http://registry.npmjs.org/npm/-/npm-3.7.1.tgz
	mkdir -p node/npm
	tar -xzf $(NPM_FILENAME).tgz --strip=1 -C node/npm
	rm -r $(NPM_FILENAME).tgz
	rm -rf node_modules
	$(NPM_EXEC) install

verify: install-node-npm
	# the freakin' npm executable is broken, makes some stupid assumptions in regard to the npm location;
	# meaning I cannot run an npm script which calls other npm scripts,
	# meaning I have to execute the npm scripts one at a time
	$(NPM_EXEC) run lint
	$(NPM_EXEC) run test
	rm -rf $$TMPDIR/jest_preprocess_cache

