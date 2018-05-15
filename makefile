MAKEFLAGS += --silent
all=java-test nodejs-test
.PHONY: all

default:
	echo No default rule.

java-test:
	rm -f java-test.zip
	zip -rX java-test.zip java postgres -x "java/out/*" "java/.gradle/*" "java/build/*" "java/gradle/*"
	echo "Finished $@."

nodejs-test:
	rm -f nodejs-test.zip
	zip -rX nodejs-test.zip nodejs postgres -x "nodejs/node_modules/*"
	echo "Finished $@."
