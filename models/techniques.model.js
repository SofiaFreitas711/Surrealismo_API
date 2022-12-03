module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: { type: String, required: [true, 'Falta o nome!']},
        }
    );
    const Technique = mongoose.model("techniques", schema);
    return Technique;
}