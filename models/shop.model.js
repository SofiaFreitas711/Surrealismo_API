module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: { type: String, required: [true, 'Falta o nome!']},
            discount: { type: Number, required: [true, 'Falta o desconto!']}, //ver se fica Number ou String
            amountPoints: { type: Number, required: [true, 'Falta a quantide de pontos necessários!']},
            info: { type: String, required: [true, 'Falta uma descrição']},
        }
    );
    const News = mongoose.model("news", schema);
    return News;
}