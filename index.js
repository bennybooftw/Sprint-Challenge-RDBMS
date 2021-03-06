const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const server = express();
server.use(express.json());

// PROJECTS

//GET

server.get("/projects", (req, res) => {
    db("projects")
      .then(projects => {
          res.status(200).json(projects)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });

  // GET BY ID

  server.get('/projects/:id', async (req, res) => {
    try {
      const projects = await db('projects')
        .where({
          'projects.id': req.params.id
        })
        .first();
      const actions = await db('actions').where({
        'actions.project_id': req.params.id
      });
      projects
        ? res.status(200).json({ ...projects, actions })
        : res.status(404).json({
            message: 'The project with the specified id does not exist.'
          });
    } catch (err) {
      res.status(500).json(err);
    }
  });


 // POST

 server.post("/projects", (req, res) => {
    const projects = req.body;

     db("projects")
      .insert(projects)
      .into("projects")
      .then(ids => {
          res.status(201).json({ids})
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

   // UPDATE

 server.put("/projects/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    db("projects")
      .where({ id: id })
      .update(changes)
      .then(count => {
          res.status(200).json(count)
      })
      .catch(err => res.status(500).json({ error: err }));
  });

 // DELETE

 server.delete("/projects/:id", (req, res) => {
    const { id } = req.params;
    db("cohorts")
      .where({id:id})
      .del()
      .then(ids => {
          res.status(200).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

 //------------ACTIONS----------------

 // GET

 server.get("/actions", (req, res) => {
    db("actions")
      .then(actions => {
          res.status(200).json(actions)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });

   // GET BY ID

  server.get('/actions/:id', (req, res) => {
      const { id } = req.params;
      db('actions')
        .where({ id })
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })

 // POST

 server.post("/actions", (req, res) => {
    const actions = req.body;

     db("actions")
      .insert(actions)
      .then(ids => {
          res.status(201).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

 // UPDATE

 server.put("/actions/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    db("actions")
      .where({ id: id })
      .update(changes)
      .then(count => {
          res.status(200).json(count)
      })
      .catch(err => res.status(500).json({ error: err }));
  });

 // DELETE

 server.delete("/actions/:id", (req, res) => {
    const { id } = req.params;
    db("actions")
      .where({id:id})
      .del()
      .then(ids => {
          res.status(200).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

  server.listen(3000, () => console.log("Server up and running on port 3000."));