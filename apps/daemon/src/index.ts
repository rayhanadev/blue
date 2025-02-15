import sade from "sade";
import { input as prompt } from "@inquirer/prompts";

import { client } from "./utils/connect";

const cli = sade("blue");

cli.version("1.0.0");

cli
  .command("start")
  .describe("Start the daemon")
  .action(() => {
    console.log("Starting daemon...");
  });

cli
  .command("stop")
  .describe("Stop the daemon")
  .action(() => {
    console.log("Stopping daemon...");
  });

cli
  .command("restart")
  .describe("Restart the daemon")
  .action(() => {
    console.log("Restarting daemon...");
  });

cli
  .command("status")
  .describe("Check the status of the daemon")
  .action(() => {
    console.log("Checking daemon status...");
  });

cli
  .command("repl")
  .describe("Enter a REPL to execute commands")
  .action(async () => {
    console.log("Welcome to the REPL!");
    console.log("Type 'help' for a list of commands.");

    let exit = false;

    while (!exit) {
      const input = await prompt({
        message: ">",
        validate: (input) => input.length > 0,
      });

      const [command, ...args] = input.split(" ");

      switch(command) {
        case "ping": {
          const res = await client.ping({});
          console.log(JSON.stringify(res, null, 2));
          break;
        }
        case "exec": {
          try {
            const data = JSON.parse(args.join(" "));

            const res = client.executeCommand({
              command: data.command,
              args: data.args,
            });

            for await (const chunk of res) {
              if (chunk.isError) {
                process.stderr.write(chunk.output);
              } else {
                process.stdout.write(chunk.output);
              }
            }
          } catch (error) {
            console.error(error);
          }

          break;
        }
        case "help": {
          console.log("Available commands:");
          console.log("  ping");
          console.log("  exec");
          console.log("  help");
          console.log("  clear");
          console.log("  exit");
          break;
        }
        case "clear": {
          console.log("\033[2J")
          break;
        }
        case "exit": {
          exit = true;
          break;
        }
        default: {
          console.error("Invalid command");
          break;
        }
      }
    }
  });

cli.parse(process.argv);

// const res = client.executeCommand({
//   command: "ls",
//   args: ["-la", "/"],
// });

// for await (const chunk of res) {
//   if (chunk.isError) {
//     process.stderr.write(chunk.output);
//   } else {
//     process.stdout.write(chunk.output);
//   }
// }
