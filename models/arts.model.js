module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: { type: String, required: [true, 'Falta o nome']},
            image: { type: String, required: [true, 'Falta a imagem']},
            date: { type: Date, required: [true, 'Falta a data']},
            info: { type: String, required: [true, 'Falta uma descrição']},
            artists: {type: mongoose.ObjectId},
        }
    );
    const Art = mongoose.model("arts", schema);
    return Art;
}