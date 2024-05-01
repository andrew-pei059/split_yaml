import * as fs from 'fs';
import * as yaml from 'js-yaml';

interface YAMLContent {
    apiVersion: string;
    kind: string;
}

function splitYAML(inputFilePath: string, namingWord: string): void {
    const fileContent: string = fs.readFileSync(inputFilePath, 'utf8');
    const yamlDocuments: string[] = fileContent.split('---');

    yamlDocuments.forEach((yamlDoc: string) => {
        // yamlDoc 物件化成 item
        const item: YAMLContent = yaml.load(yamlDoc) as YAMLContent;
        if (item.apiVersion) {
            const outputFileName: string = getFileNamePrefix(item, namingWord);
            console.log(outputFileName)
            const outputPath: string = `./new_data/${outputFileName.toLowerCase()}.yaml`;
            fs.writeFileSync(outputPath, yaml.dump(item));
        }
    });
}

function getFileNamePrefix(item: YAMLContent, namingWord: string): string {
    const kindValue: string | undefined = item.kind;
    const pattern = new RegExp(`^${namingWord}-`);
    const fname = kindValue.replace(pattern, '');
    return kindValue.includes(namingWord) ? `config-${fname}` : kindValue;
}

// Example usage:
const inputFilePath: string = './data/raw_file.yml'
const namingWord: string = 'myweb-fab1'; // Your naming word parameter
splitYAML(inputFilePath, namingWord);
