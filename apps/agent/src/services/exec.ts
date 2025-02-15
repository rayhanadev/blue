import { spawn } from "node:child_process";

import type { HandlerContext } from "@connectrpc/connect";
import type { ExecRequest, ExecResponse } from "@repo/proto/services/exec";

export async function* executeCommand(
  req: ExecRequest,
  ctx: HandlerContext,
): AsyncGenerator<ExecResponse> {
  const { command, args } = req;

  const child = spawn(command, args);

  for await (const data of child.stdout) {
    yield {
      $typeName: "exec.ExecResponse",
      output: data.toString(),
      isError: false,
    };
  }

  for await (const data of child.stderr) {
    yield {
      $typeName: "exec.ExecResponse",
      output: data.toString(),
      isError: true,
    };
  }
}
