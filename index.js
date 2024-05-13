
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const groupChatRoutes = require('./routes/groupChatRoute');
const app = express();
const options = {//options for cor to use when checking request validity
    origin: * //wildcard
}
app.use(cors(options)); //was just cors()

app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected now'))
  .catch(err => console.log(err));

// Use user routes
app.use('/api', userRoutes);
app.use('/api', groupChatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const db = mongoose.connection
