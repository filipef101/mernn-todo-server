const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // validate
//     if (!email || !password)
//       return res.status(400).json({ msg: "Not all fields have been entered." });

//     const user = await User.findOne({ email: email });
//     if (!user)
//       return res
//         .status(400)
//         .json({ msg: "No account with this email has been registered." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         displayName: user.displayName,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete("/delete", auth, async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.userid);
//     res.json(deletedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/tokenIsValid", async (req, res) => {
//   try {
//     const token = req.header("x-auth");
//     if (!token) return res.json(false);

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verified) return res.json(false);

//     const user = await User.findById(verified.id);
//     if (!user) return res.json(false);

//     return res.json(true);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get("/", auth, async (req, res) => {
//   const user = await User.findById(req.userid);
//   res.json({
//     displayName: user.displayName,
//     id: user._id,
//   });
// });

router.post('/', auth, async (req, res) => {
  console.log(req.body)
  if (!req.body.project) return res.status(400)
  const project = new Project({
    owner: req.userid,
    project: req.body.project
  })

  project.save().then(async (d) => {
    const user = await User.findById(req.userid)
    user.projects.push(project)
    user.save()
      return res.status(200).json({
          ...d.toJSON()
      })
  })
  .catch(error => {
      console.log('error',error)
      return res.status(400).json({
          error,
      })
  })
})

//delete task
router.delete('/:id', auth, async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  if (!req.params.id) return res.status(400)
  Project.findOneAndDelete({_id: req.params.id, owner: req.userid}).then(() => {
      return res.status(200).json({
        success: true,
    })
  })
  .catch(error => {
      return res.status(400).json({
          error,
      })
  })
})

// update
router.patch('/', auth, async (req, res) => {
  console.log(req.body)
  if (!req.body.id || !(req.body.project)) return res.status(400)
  console.log('req.body')

  let updateParams = {}
  if (req.body.project) updateParams.project = req.body.project
  // Project.findByIdAndUpdate(req.body.id,updateParams)

  Project.findOneAndUpdate({id: req.body.id, owner: req.userid},updateParams).then(() => {
      console.log('ok')
      return res.status(200).json({
          success: true,
      })
  })
  .catch(error => {
      console.error(error)
      return res.status(400).json({
          error,
      })
  })
})


module.exports = router;
