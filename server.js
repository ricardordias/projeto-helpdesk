require("dotenv").config();
const app = require("./src/app");

const BASE = process.env.BASE;
app.listen(BASE, () => console.log(`HelpDesk API rodando em ${BASE}`));