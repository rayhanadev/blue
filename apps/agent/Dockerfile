FROM oven/bun AS build

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

COPY ./apps/agent /app/apps/agent

WORKDIR /app/apps/agent

RUN bun run build

FROM ubuntu:22.04

WORKDIR /app

COPY --from=build /app/apps/agent/dist/agent /app/agent

RUN chmod +x /app/agent

EXPOSE 50051

CMD ["/app/agent"]
