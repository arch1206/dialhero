const router = require("express").Router();
const HeroService = require("../../services/HeroService");
const JwtService = require("../../services/JwtService");



// router.get("/posts", async (req, res) => {
//   const { dest, draw, length, start, date } = req.query;
//   const posts = await PostService.getAll(dest, draw, length, start, date);
//   res.json(posts);
// });

// router.get("/posts/:id", async (req, res) => {
//   const { id } = req.params;
//   const { slug } = req.query;
//   const response = await PostService.getById(id, slug);
//   res.json(response);
// });

router.post("/heros", JwtService.verifyUserToken , async (req, res) => {
  const heroData = req.body;
  const response = await HeroService.insertHero(heroData);
  res.json(response);
});
router.get("/heros/:code",async(req,res)=>{
    const {code} = req.params;
    const response = await HeroService.getHero(code);
    res.json(response);
})
router.get("/heros", JwtService.verifyUserToken ,async(req,res)=>{
  const {draw, length, start} = req.query;
  const response = await HeroService.getAllHero(draw, length, start);
  res.json(response);
})
router.post("/deleteHero", JwtService.verifyUserToken ,async(req,res)=>{
  var [code,name] = req.body
  const response = await HeroService.deleteHero(code,name);
  res.json(response);
})


module.exports = router;
