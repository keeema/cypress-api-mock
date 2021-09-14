import { startServer } from "../server";

const port: number = !isNaN(+process.argv?.[2]) ? +process.argv?.[2] : 3000;
startServer({ apiMockServer: { hostname: "0.0.0.0", hostPort: port } });
