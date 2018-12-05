FROM microsoft/dotnet:2.1-sdk AS build-env
WORKDIR /source

COPY *.sln ./
COPY PizzaAPI/*.csproj ./PizzaAPI/
COPY PizzaAPI.Data/*.csproj ./PizzaAPI.Data/
COPY PizzaAPI.Services/*.csproj ./PizzaAPI.Services/
COPY PizzaAPI.Tests/*.csproj ./PizzaAPI.Tests/
RUN dotnet restore

COPY . ./

RUN dotnet test ./PizzaAPI.Tests/PizzaAPI.Tests.csproj

RUN dotnet publish -c Release -o /app

EXPOSE 80

FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app .
ENTRYPOINT ["dotnet", "PizzaAPI.dll"]
