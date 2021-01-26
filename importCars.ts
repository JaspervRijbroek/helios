import { fstat, readFileSync, writeFileSync } from "fs";
import { sync } from "glob";
import { parse } from "path";
import { toJson } from "xml2json";

let files = sync('./cars/*.xml'),
    cars = files.map(file => {
        let xmlContent = readFileSync(file),
            content = JSON.parse(toJson(xmlContent).toString())

        console.log(content.OwnedCarTrans);
    });

// writeFileSync('./database/seeds/carData.json', JSON.stringify(cars));