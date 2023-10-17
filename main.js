/*
* Project: Milestone 1
* File Name: main.js
* Description: The program takes a zipped file consisting of png images and 
*              take each png image to grayscale. The grayscale image will then
*              placeed inside a folder called grayscaled.
* Created Date: Oct 10, 2023
* Author: Andrew Huang | Set B
*
*/

const IOhandler = require("./IOhandler");
const path = require("path");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");


IOhandler.unzip(zipFilePath, pathUnzipped)
.then((data) => {
    console.log(data)
    return IOhandler.readDir(pathUnzipped)
})
.then((data) => {
    const promisesArray = []
    for(let i = 0; i < data.length; i++){
        const imagePath = path.join(pathUnzipped, data[i]);
        const imgOutputPath = path.join(pathProcessed, data[i]);
        promises.push(IOhandler.grayScale(imagePath,imgOutputPath))

    }
    return promisesArray
})
.then((data) => {Promise.all(data)})
.then(() => console.log("Process Completed!"))
.catch((err) => console.log(err))


//=============Instructors Notes=============I

// Step 1: Read the zip file
// Step 2: unzip the file
// Step 3: Read all png images from unzipped folder
// Step 4: Send them to the grayscaled filter function
// Step 5: After ALL IMAGES have SUCCESSFULLY been grayscaled then console.log("complete")

//Use Promise.All()

// IOHandler.unzip()
//  .then(() => IOHandler.readDir())
//  .then(() => IOHandler.grayScale())
//  .catch(err => console.log(err))