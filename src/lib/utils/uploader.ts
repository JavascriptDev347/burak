// multer → multipart/form-data (file upload) uchun
import multer from "multer";
//path → fayl nomi / extension bilan ishlash
import path from "path";
// uuid v4 → unik (takrorlanmaydigan) nom berish
import {v4} from "uuid";
import fs from "fs"

//Bu funksiya multer storage config qaytaradi
function getTargetImageStorage(address: any) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            // cb(null,`./uploads/${address}`);
            const uploadPath = path.join("uploads", address);

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, {recursive: true});
            }

            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const extension = path.parse(file.originalname).ext;
            const random_name = v4() + extension
            cb(null, random_name);
        }
    })
}

function makeUploader(address: any) {
    const storage = getTargetImageStorage(address);

    return multer({storage: storage})
}

export default makeUploader;