FROM gradle:jdk8-alpine as builder

RUN mkdir app
WORKDIR /home/gradle/app

COPY . .

RUN gradle assemble

#################

FROM openjdk:8-jdk-alpine

EXPOSE 8080

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /home/gradle/app/build/libs/pizza-0.0.1.jar .

CMD ["java", "-Dspring.profiles.active=docker", "-jar", "pizza-0.0.1.jar"]
