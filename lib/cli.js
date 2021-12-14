#!/usr/bin/env node
import { program } from "commander";
import { monitor } from "./index.js";

program.command("monitor <path>", { isDefault: true })
.option('-p --port <port>', 'port to use for the monitor', '1337')
.action(monitor);
program.parse()