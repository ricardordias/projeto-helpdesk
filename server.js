require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;
const BASE = process.env.BASE || `http://localhost:${PORT}`;

app.listen(PORT, () => console.log(`HelpDesk API rodando em ${BASE}`));