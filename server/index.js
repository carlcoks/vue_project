import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan'
import devOptions from './controllers/config/devOptions';

import auth from './routes/auth'

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/dist', express.static('dist'));

devOptions(app);

app.use('/api/auth', auth)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => console.log('Server listen on port =', port, 'ENV =', process.env.NODE_ENV))
