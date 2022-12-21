import {readdirSync} from "fs";
import {join} from "path";
import {filter, includes} from "lodash";

export function classNames(...classes: string[]) {
    return filter(classes, Boolean).join(' ')
}

export function getPostFilenames() {
    let fileNames = readdirSync(join(process.cwd(), 'posts'));
    return filter(fileNames, (fileName: string) => includes(fileName, '.md'))
}
