/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: Oct 10, 2023
 * Author: Andrew Huang | Set B
 *
 */

const AdmZip = require("adm-zip"),
  fs = require("fs/promises"),
  {createReadStream, createWriteStream} = require("fs"),
  PNG = require("pngjs").PNG,
  {pipeline} = require("stream"),
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject)=> {
    try{
      const zip = new AdmZip(pathIn)
      zip.extractAllTo(pathOut, true)
      resolve("Extraction operation complete")

    }
    catch(err){
      reject(err)
    }

  })

};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return fs.readdir(dir)
  .then((data) => {
    const pngArray = []
    data.forEach(element => {
      if (path.extname(element) === ".png"){
        pngArray.push(element)
      }
    });
    return pngArray
  })
};

/**
 * Description: take the png object and alter the pixels
 * Only used var because it's from pngsjs library documentation.
 * 
 * @param {object} pngImage 
 * @return {object}
 */
const grayScaleFilter = (pngImage) =>{
  for (var y = 0; y < pngImage.height; y++) {
    for (var x = 0; x < pngImage.width; x++) {
      var idx = (pngImage.width * y + x) << 2;

      const greyValue = ((pngImage.data[idx] + pngImage.data[idx + 1] + pngImage.data[idx + 2]) / 3)

      // Grayscale each pixel
      pngImage.data[idx] = greyValue;
      pngImage.data[idx + 1] = greyValue;
      pngImage.data[idx + 2] = greyValue;

    }
  }
  return pngImage
}

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  
  return fs.mkdir(path.dirname(pathOut), {recursive:true})
  .then(() => {
    return new Promise ((resolve, reject) => {
      const inputStream = createReadStream(pathIn)
      const outputStream = createWriteStream(pathOut)
      const pngStream = new PNG().on("parsed", function (){
        const modifiedData = grayScaleFilter(this)
        modifiedData.pack()
      })
    
      pipeline(inputStream, pngStream, outputStream, (err) => {
        if (err){
          reject(err)
        }
        else{
          resolve()
        }
      })
    })
  })
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
