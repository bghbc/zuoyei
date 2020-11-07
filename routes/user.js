var express = require("express");
var router = express.Router();
const user = require("../sql/user");
/* GET home page. */
router.get("/", function (req, res, next) {
  user.find({}, (err, data) => {
    if (err) {
      console.log(err);
    }
    // console.log(data);

    res.render("u1", {
      index: 2,
      data: data,
    });
  });
});

router.get("/add", function (req, res, next) {
  res.render("userAdd", {
    index: 2,
  });
});

router.post("/addAction", function (req, res, next) {
  console.log("进入user addAction");

  let obj = req.body;
  console.log(obj);

  user.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err);
    }
    // console.log(data);
    res.redirect("/user");
  });
});

//user   删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log(req.query);

  user.deleteOne({ _id: req.query._id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.redirect("/user");
  });
});

//修改操作
router.get("/update", function (req, res, next) {
  console.log("我现在在user   upadate");
  //get来的数据在req.query.id
  console.log(req.query);
  //宇宙唯一id
  const _id = req.query._id;
  console.log("_id", _id);

  user.findById({ _id: _id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("我现在到了/user   update修改数据路由");
    // console.log(data)
    console.log(data._id);
    res.render("userUpdate", {
      index: 2,
      data: data,
    });
  });
});

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log("我在/updateAction里面");
  // 接收当前商品的数据
  const obj = req.body;
  console.log(obj);
  user.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/user");
  });
});

//商品搜索
router.get("/search", (req, res, next) => {
  console.log("/search 商品搜索路由 搜索数据")
  const obj = req.query;
console.log(obj)
  let reg = new RegExp(obj.search);
 
  production.find({proName:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("user", {
       index: 2,
       data,
    });
  })

 
});

module.exports = router;


