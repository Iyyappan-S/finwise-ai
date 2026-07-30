const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.finwisecluster.wzjmfjj.mongodb.net",
  (err, records) => {
    if (err) {
      console.error(err);
    } else {
      console.log(records);
    }
  }
);