import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";

import { SystemService } from "@repo/proto";

const transport = createConnectTransport({
  httpVersion: "1.1",
  baseUrl: "http://0.0.0.0:50051",
});

export const client = createClient(SystemService, transport);
