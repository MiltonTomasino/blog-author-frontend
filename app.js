const express = require('express');
const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use("/", indexRoutes);
app.use("/login", loginRoutes);

app.listen(3001, ()=> {
    console.log('Server is running on port 3001');
})