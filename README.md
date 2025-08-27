## Express Installation
Follow these steps to setup the project.
- Install Node.Js
- <pre>npm init -y</pre>
- <pre>npm install express nodemon</pre>
- Open package.json (which is created when you run point 2)
- <pre>"scripts": {"dev": "nodemon index.js"}</pre>
- create index.js
- <pre>const express = require('express'); const app = express(); const PORT = 5000;  app.use(express.json());  app.get('/', (req, res) => { res.send('Todo API is running...'); }); app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`); });</pre>
- run <pre>npm run dev</pre>

## Installation of Packages
- Install MongoDB (through website)
- <pre>npm install mongoose</pre>
- <pre>npm install bcryptjs jsonwebtoken</pre>
- <pre>npm install dotenv</pre>
- <pre>npm install express-validator</pre>
