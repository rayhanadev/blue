import { client } from "./utils/connect";

const res = await client.ping({});

console.log(res);
