import express from 'express'
import rgenre from './routes/genres.js'
import rfilms from './routes/films.js'
import cors from 'cors'


 const app = express();
 app.use(express.json());
 app.use(cors());
 app.use('/genres',rgenre)
 app.use('/films', rfilms) 


app.use((err, req, res, suite) => {
  console.error(err);                                   // le détail de l'erreur reste ici
  res.status(500).json({ erreur: 'Erreur interne du serveur' });  // le client reçoit un message propre
});

 app.listen(3001)

