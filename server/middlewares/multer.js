import multer from "multer";
import path from "path";

const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("File extension not supported"), false);
      return;
    }
    // does it accept gif????
    cb(null, true);
  },
});


// const multerOptions = {
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let extension = path.extname(file.originalname);
//         if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
//             cb(new Error("File extension not supported"), false);
//             return;
//         }
//         cb(null, true);
//     }
// };
// multer(multerOptions);

//  tengo que leer la documentacion de multer para saber como crear un album... 

export {multerUpload}