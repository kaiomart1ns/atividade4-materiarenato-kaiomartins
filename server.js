const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const Evento = require('./models/Evento');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const eventoRoutes = require('./routes/evento');
app.use('/api', eventoRoutes);


app.get('/', async (req, res) => {
    try {

        const eventos = await Evento.findAll();
        console.log(eventos);
        res.render('index', { eventos });
    } catch (err) {
        console.error("Erro ao buscar eventos:", err);
        res.status(500).send("Erro ao buscar eventos.");
    }
});


app.get('/eventos/:id', async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id);
        if (evento) {
            res.render('detalhes', { evento });
        } else {
            res.status(404).send('Evento não encontrado');
        }
    } catch (err) {
        console.error("Erro ao buscar evento:", err);
        res.status(500).send("Erro ao buscar evento.");
    }
});


sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado");
}).catch(err => {
    console.log("Erro ao sincronizar o banco de dados:", err);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando na porta ${PORT}');
});