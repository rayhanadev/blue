# @repo/agent

The agent lives inside every container and is responsible for managing and communicating
with the Blue daemon.

You can build the agent to run locally using the `bun run build` command.
To build a Docker image, run `bun run build:docker -t <image_name>`.

The agent will be exposed on port 50051.
