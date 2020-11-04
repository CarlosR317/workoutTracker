const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// the PORT being used

const PORT = process.env.PORT || 3000 ;

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// connecting to mongo db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useCreateIndex: true});


require("./routes/api_routes")(app);
require("./routes/html_routes")(app);


app.listen(PORT, () => {

    console.log(`Application is running on http://localhost:${PORT}`);

});