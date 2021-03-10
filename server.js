const express  = require('express');
const cors = require('cors')
const searchRoutes = require('./routes/SearchRoutes');
const app = express();

app.use(cors());
app.use('/api', searchRoutes);

app.listen(5000, console.log('Server running Ok'));

