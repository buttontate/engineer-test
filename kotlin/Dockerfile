FROM gradle:4.10.2-jdk8-alpine as builder

WORKDIR /usr/src/app
USER root

COPY  . .
RUN gradle build --no-daemon

#######################################

FROM openjdk:8-jre-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build/libs/base-kotlin-application.jar .

EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/urandom", "-Dspring.profiles.active=${JAVA_ENV}", "-jar", "base-kotlin-application.jar"]
