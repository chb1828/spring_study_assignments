#FROM openjdk:8-jre-alpine
FROM openjdk:8-jre
VOLUME /tmp
COPY build/libs/chb-0.0.1-SNAPSHOT.jar /chb.jar
ENTRYPOINT ["java", "-jar", "/chb.jar"]
