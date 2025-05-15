import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import colors from "colors";

// Dump YAML file to disk
export function writeYamlSpec(swaggerSpec: any, destPath: string = path.resolve(__dirname, '../openapi.yml')): void {
  console.log(colors.cyan(`⏳ Writing OpenAPI YAML...`));
  const yamlStr = yaml.dump(swaggerSpec, { noRefs: true });
  fs.writeFileSync(destPath, yamlStr, 'utf8');
  console.log(colors.cyan(`✅ OpenAPI YAML written to ${destPath}`));
}