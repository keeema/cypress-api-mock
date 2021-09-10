import { constants } from "../constants";
import { startServer } from "../server";

startServer({ apiMockServer: { hostname: "0.0.0.0", hostPort: constants.Port } });
