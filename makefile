MAKEFLAGS += --silent
all=java-test nodejs-test csharp-test
.PHONY: all

default:
	echo No default rule.

java-test:
	rm -f java-test.zip
	cp template/README.md java
	zip -rX java-test.zip java postgres -x "java/out/*" "java/.gradle/*" "java/build/*" "java/gradle/*"
	rm -f java/README.md
	echo "Finished $@."

nodejs-test:
	rm -f nodejs-test.zip
	cp template/README.md nodejs
	zip -rX nodejs-test.zip nodejs postgres -x "nodejs/node_modules/*"
	rm -f nodejs/README.md
	echo "Finished $@."

csharp-test:
	rm -f csharp-test.zip
	cp template/README.md csharp
	zip -rX csharp-test.zip csharp postgres -x "csharp/.idea/*" "csharp/**.user" "csharp/**/bin/*" "csharp/**/obj/*" "charp/**/Properties/*" "**/.DS_Store"
	rm -f csharp/README.md
	echo "Finished $@."
