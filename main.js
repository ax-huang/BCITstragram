const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");


//Step 1: unzip myfile.zip
// --> fs.createReadStream(zipFile)  | currently a stream


// Step 1: Read the zip file
// Step 2: unzip the file
// Step 3: Read all png images from unzipped folder
// Step 4: Send them to the grayscaled filter function
// Step 5: After ALL IMAGES have SUCCESSFULLY been grayscaled then console.log("complete")

//Read each png file...
//--> fs.createReadStream(png1.png)

//Use Promise.All()

// fs.createReadStream(zipFilePath)
// .pipe(unzipper.Extract({ path: pathUnzipped }));

// IOHandler.unzip()
//  .then(() => IOHandler.readDir())
//  .then(() => IOHandler.grayScale())
//  .catch(err => console.log(err))

// IOhandler.unzip(zipFilePath, pathUnzipped)