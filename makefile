MAKEFLAGS += --silent
all=java-test
.PHONY: all

default:
	echo No default rule.

java-test:
	rm -f java-test.zip
	zip -rX java-test.zip java postgres -x "java/out/*" "java/.gradle/*" "java/build/*" "java/gradle/*"
	echo "Finished $@."
