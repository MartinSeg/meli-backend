const express  = require('express');
const cors = require('cors')
const searchRoutes = require('./routes/SearchRoutes');
const app = express();

const PORT = process.env.PORT || 5000

app.use(cors());
app.use('/api', searchRoutes);

app.listen(PORT, console.log('Server running Ok'));

