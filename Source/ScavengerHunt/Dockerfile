FROM dotnet/node/asp:3.1 as base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM dotnet/node/sdk:3.1 as build
WORKDIR /src
COPY ScavengerHunt/ScavengerHunt.csproj ScavengerHunt/
COPY ScavengerHunt.Data/ScavengerHunt.Data.csproj ScavengerHunt.Data/
COPY ScavengerHunt.Hunts/ScavengerHunt.Hunts.csproj ScavengerHunt.Hunts/
COPY ScavengerHunt.Hunts.Implementation/ScavengerHunt.Hunts.Implementation.csproj ScavengerHunt.Hunts.Implementation/
COPY EFRepository/EFRepository.csproj EFRepository/
RUN dotnet restore "ScavengerHunt/ScavengerHunt.csproj"

COPY . .

WORKDIR /src/ScavengerHunt
RUN dotnet build "ScavengerHunt.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ScavengerHunt.csproj" -c Release -o /app/publish

FROM base as final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ScavengerHunt.dll"]
