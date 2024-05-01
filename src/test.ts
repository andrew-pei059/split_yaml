import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface YAMLContent {
    apiVersion: string;
    kind: string;
}
const inputFilePath = './data/raw_file.yml'
const outputPath = './new_data/123.yml'


const fileContent: string = fs.readFileSync(inputFilePath, 'utf8');
const yamlDocuments: string[] = fileContent.split('---');
console.log('------------------------------------------')
yamlDocuments.forEach((yamlDoc: string) => {
    const content: YAMLContent = yaml.load(yamlDoc) as YAMLContent;
    console.log(content.kind)
    }
)
// fs.writeFileSync(outputPath, yaml.dump(content));