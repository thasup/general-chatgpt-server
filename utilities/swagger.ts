import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

// Dump YAML file to disk
export function writeYamlSpec(swaggerSpec: any, destPath: string = path.resolve(__dirname, '../openapi.yml')): void {
  const yamlStr = yaml.dump(swaggerSpec, { noRefs: true });
  fs.writeFileSync(destPath, yamlStr, 'utf8');
  console.log(`✅ OpenAPI YAML written to ${destPath}`);
}