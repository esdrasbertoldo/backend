const mongoose = require("mongoose");

//como se fosse uma tabela
const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true,
        },
    },
    {
        //Gravar data e hora de criação e atuazação
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true}
    }
);
//modificar para o heroku
File.virtual("url").get(function() {
    const url = process.env.URL || 'http://localhost:3333'
    
    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);