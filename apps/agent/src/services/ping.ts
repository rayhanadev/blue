import type { HandlerContext } from "@connectrpc/connect";
import type { PingRequest } from "@repo/proto/services/ping";

export async function ping(req: PingRequest, ctx: HandlerContext) {
  return { message: "pong" };
}
