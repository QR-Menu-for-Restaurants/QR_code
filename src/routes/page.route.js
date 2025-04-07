import { Router } from "express";

const pageRouter = Router();

pageRouter.get("/forgot-password", (req, res) => {
  res.render("forgot-password", { error: null, mess: null });
});

pageRouter.get("/reset-password", (req, res) => {
  const { token } = req.query;
  res.render("reset-password", { error: null, mess: null, token });
});

export default pageRouter;
