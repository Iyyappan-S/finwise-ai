const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.finwisecluster.wzjmfjj.mongodb.net",
  (err, records) => {
    if (err) {
      console.error("DNS Error:");
      console.error(err);
    } else {
      console.log("SRV Records:");
      console.log(records);
    }
  }
);