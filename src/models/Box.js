const mongoose = require("mongoose");

//como se fosse uma tabela
const Box = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]

    },
    {
        //Gravar data e hora de criação e atuazação
        timestamps: true
    }
);
module.exports = mongoose.model("Box", Box);