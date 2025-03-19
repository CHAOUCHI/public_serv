/**
 * Code non utilisé
 */


import { readFileSync } from "fs";

/**
 * @type {string}
 */
export const mimeTypes = JSON.parse(readFileSync("mime-types.json"));


export function getContentType(fileName) {
    console.log(fileName);
    const fileNameTokens = fileName.split(".");
    const fileExtension = fileNameTokens[fileNameTokens.length - 1];

    const validContentTypes = ["application/octet-stream"];
    for (const contentTypeValue in mimeTypes) {
        if(Object.prototype.hasOwnProperty.call(mimeTypes, contentTypeValue)) {
            const contentTypeInfos = mimeTypes[contentTypeValue];

            if (
                Object.prototype.hasOwnProperty.call(contentTypeInfos,"extensions")
                &&
                contentTypeInfos.extensions.toString().includes(fileExtension)
            ) {
                validContentTypes.push(contentTypeValue);
            }
        }
    }
    console.log(validContentTypes);
    return validContentTypes.reverse()[0];

}

// console.log(getContentType("index.html"));


