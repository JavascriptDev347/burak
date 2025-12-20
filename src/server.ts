import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
dotenv.config();

//[40-41] Loyihamizning standart va Member - Service Model (admin signup) PART 1

mongoose.connect(process.env.MONGO_URL as string, {}).then(data => {
    console.log("MONGO_URL connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
    })
}).catch(err => {
    console.log("Failed to connect to the server", err);
})



