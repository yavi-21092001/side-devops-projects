FROM openjdk:17-jdk-slim

# Create a non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copy and cache dependencies first (speeds up rebuilds)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline

# Then copy source code
COPY src src
RUN ./mvnw package -DskipTests

USER appuser

EXPOSE 8080

# Use exec form for proper signal handling
CMD ["java", "-jar", "-Xmx512m", "-XX:+UseContainerSupport", "target/app.jar"]