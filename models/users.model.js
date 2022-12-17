module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: { type: String, required: [true, 'Falta o nome!']},
            email: { type: String, required: [true, 'Falta o seu email']},
            password: { type: String, required: [true, 'Falta uma palavra-passe!']},
            image: { type: String},
            birthDate: {type: Date, required: [true, 'Falta a sua data de nascimento!']},
            locality: { type: String, required: [true, 'Falta a sua localidade']},
            type: {type: String, enum: {values: ['user', 'admin'], default: 'user', message: '{VALUE} não é suportado'}},
            active: { type: Boolean, default: true},
            points: {type: Number},
            gamesPlayed: {type: Array},
            exchanges: {type: Array},
            favorites: {type: Array},
        }
    );
    const User = mongoose.model("Users", schema);
    return User;
}