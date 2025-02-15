import type { ConnectRouter } from "@connectrpc/connect";
import { SystemService } from "@repo/proto";

import * as PingService from "./services/ping";

export default (router: ConnectRouter) =>
  router.service(SystemService, {
    ...PingService,
  });
