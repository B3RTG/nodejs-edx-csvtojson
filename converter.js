const csv=require('csvtojson')
const fs = require("fs")
const path = require("path")

const originalFileName = "customer-data.csv"
const filePath = path.join(__dirname, originalFileName)
const destinationFileName = originalFileName.replace("csv","json")


var jsonArrayBuffer = []

if (fs.existsSync(filePath)) {

    csv().fromFile(filePath).on('json', (jsonObject)=> {
        jsonArrayBuffer.push(jsonObject)
    }).on('done',(error)=>{
        if(error) return console.log(error)
        fs.writeFileSync(path.join(__dirname, destinationFileName), JSON.stringify(jsonArrayBuffer, null, 1))
        console.log(`File ${originalFileName} parsed from csv to json`)
    })

} else {
    console.log(`File ${originalFileName} does not exists`)
}