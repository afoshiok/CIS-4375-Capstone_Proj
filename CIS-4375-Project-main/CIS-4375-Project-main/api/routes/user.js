const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { json } = require("express");
const prisma = new PrismaClient()


//GET enpoint all users
router.get("/", async (req,res) => {
    const user = await prisma.user.findMany()
    res.json(user)
});

//GET endpoint user by id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

//POST endpoint create a new user
router.post('/', async (req, res, next) => {
    try {
      const {  User_Fname, User_Lname, Role } = req.body;
      const user = await prisma.user.create({
        data: {
          User_Fname: User_Fname,
          User_Lname: User_Lname,
          Role: Role
        }
      });
      res.json(user);
      } catch (error) {
      next(error);
    }
  });

  //PUT endpoint modify a user
  router.put('/:id', async (req, res, next) => {
    try {
      const { User_Fname, User_Lname, Role } = req.body;
      const user = await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: {
          User_Fname: User_Fname,
          User_Lname: User_Lname,
          Role: Role
        }
      });
      res.json(user);

    } catch (error) {
      next(error);
    }
  });

  //Delete endpoint Delete user by id
  router.delete('/:id', async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const user = await prisma.user.delete({
        where: {
          id: id
        }
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  });


module.exports = router