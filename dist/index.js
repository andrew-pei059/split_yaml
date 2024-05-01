"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const yaml = __importStar(require("js-yaml"));
function splitYAML(inputFilePath, namingWord) {
    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    const yamlDocuments = fileContent.split('---');
    yamlDocuments.forEach((yamlDoc) => {
        // yamlDoc 物件化成 item
        const item = yaml.load(yamlDoc);
        if (item.apiVersion) {
            const outputFileName = getFileNamePrefix(item, namingWord);
            console.log(outputFileName);
            const outputPath = `./new_data/${outputFileName.toLowerCase()}.yaml`;
            fs.writeFileSync(outputPath, yaml.dump(item));
        }
    });
}
function getFileNamePrefix(item, namingWord) {
    const kindValue = item.kind;
    const pattern = new RegExp(`^${namingWord}-`);
    const fname = kindValue.replace(pattern, '');
    return kindValue.includes(namingWord) ? `config-${fname}` : kindValue;
}
// Example usage:
const inputFilePath = './data/raw_file.yml';
const namingWord = 'myweb-fab1'; // Your naming word parameter
splitYAML(inputFilePath, namingWord);
