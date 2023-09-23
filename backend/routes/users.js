const router = require("express").Router();
const User = require("../models/User");

router.put("/:id", async (req, res) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send("ユーザー情報が更新されました");
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).send("あなたは自分のアカウントの時だけユーザー情報を更新します")
  }
})

router.delete("/:id", async (req, res) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).send("ユーザー情報が削除されました");
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).send("あなたは自分のアカウントの時だけユーザー情報を削除します")
  }
})

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err)
  }
})

// フォローする
router.put("/:id/follow", async (req, res) => {
  if (req.params.id === req.body.id) {
    return res.status(500).json("自分をフォローすることはできません");
  }
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);
    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: {
          followers: req.body.id,
        }
      })
      await currentUser.updateOne({
        $push: {
          followings: req.params.id,
        }
      })
      return res.status(200).json("フォローに成功しました");
    } else {
      res.status(403).json("既にこのユーザーをフォローしています。")
    }
  } catch (err) {
    return res.status(500).json(err);
  }
})

// フォローすを外す
router.put("/:id/unfollow", async (req, res) => {
  if (req.params.id !== req.body.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.id);
      if (user.followers.includes(req.body.id)) {
        await user.updateOne({
          $pull: {
            followers: req.body.id,
          }
        })
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id,
          }
        })
        return res.status(200).json("フォロー解除しました");
      } else {
        res.status(403).json("このユーザーはフォロー解除できません")
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォロー解除できません")
  }
})
// router.get("/", (req, res) => {
//   res.send("users top");
// })

module.exports = router;
