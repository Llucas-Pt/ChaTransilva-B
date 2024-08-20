const express = require("express")
const cors = require("cors")
const {default: axios} = require("axios");
const app = express()
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname, 'build')))

app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=()");
  next();
});

app.use(express.json())
app.use(cors({ origin: true}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.get('/', (req, res) => {
  res.send("Servidor rodando!")
})


app.post("/authenticate", async (req, res) => {
    const {username} = req.body

    try {
        const r = await axios.put(
            'https://api.chatengine.io/users/',
          
          { username: username, secret: username, first_name: username },
          { headers: { "Private-Key": "7d544457-843e-495d-ad55-cc28b1c25ba5"}}
          
        );
        return res.status(r.status).json(r.data);
      } catch (e) {
        return res.status(e.response.status).json(e.response.data);
      }

   
    
})






app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})