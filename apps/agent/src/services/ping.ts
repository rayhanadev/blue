import type { HandlerContext } from "@connectrpc/connect";
import type { PingRequest, PongResponse } from "@repo/proto/services/ping";

export async function ping(
  req: PingRequest,
  ctx: HandlerContext,
): Promise<PongResponse> {
  return { $typeName: "ping.PongResponse", message: "pong" };
}
