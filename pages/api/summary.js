export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
    //compute DB summary
    const users = readUsersDB();
    const admin = users.filter((x) => x.isAdmin === true);
    const usernum = users.filter((x) => x.isAdmin === false);
    const sum = usernum.reduce((p, c) => {
      return (p += c.money);
    }, 0);

    return res.json({
      ok: true,
      userCount: usernum.length,
      adminCount: admin.length,
      totalMoney: sum,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
