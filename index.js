import express from 'express'
import rgenre from './routes/genres.js'
import rfilms from './routes/films.js'


 const app = express();
 app.use('/genres',rgenre)
 app.use('/films', rfilms)

//  app.use(cors())

 app.listen(3000)