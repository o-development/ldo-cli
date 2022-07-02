import { exec } from "child-process-promise";
import fs from "fs-extra";
import path from "path";
import { renderFile } from "ejs";

const DEFAULT_SHAPES_FOLDER = "./shapes";

export async function init() {
  // Install dependencies
  await exec("npm install ldo --save");
  await exec("npm install ldo-cli @types/shexj @types/jsonld --save-dev");

  // Create "shapes" folder
  await fs.promises.mkdir(DEFAULT_SHAPES_FOLDER);
  const defaultShapePaths = await fs.promises.readdir(
    path.join(__dirname, "./templates/defaultShapes")
  );
  await Promise.all(
    defaultShapePaths.map(async (shapePath) => {
      const shapeContent = await renderFile(
        path.join(__dirname, "./templates/defaultShapes", shapePath),
        {}
      );
      await fs.promises.writeFile(
        path.join(DEFAULT_SHAPES_FOLDER, `${path.parse(shapePath).name}.shex`),
        shapeContent
      );
    })
  );

  // Add build script
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const packageJson: any = JSON.parse(
    (await fs.promises.readFile("./package.json")).toString()
  );
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  packageJson.scripts["build:ldo"] =
    "ldo build --input ./shapes --output ./ldo";
  await fs.promises.writeFile(
    "./package.json",
    JSON.stringify(packageJson, null, 2)
  );

  // Build LDO
  await exec("npm run build:ldo");
}
