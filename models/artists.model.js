module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: { type: String, required: [true, 'Falta o nome']},
            image: { type: String, required: [true, 'Falta a imagem']},
            info: { type: String, required: [true, 'Falta uma descrição']},
            arts: {type: Array},
        }
    );
    const Artist = mongoose.model("artists", schema);
    return Artist;
}