#!/usr/bin/env node

import { program } from "commander";
import { build } from "./build";

program
  .name("LDO-CLI")
  .description("CLI to some JavaScript string utilities")
  .version("0.0.1");

program
  .command("build")
  .description("Build a shex folder into Shape Types")
  .option("-i, --input <inputPath>", "Provide the input path", "./shapes")
  .option("-o, --output <outputPath>", "Provide the output path", "./ldo")
  .action(build);

program.parse();
