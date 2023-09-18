const originList = [
  "http://127.0.0.1",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (originList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

module.exports = corsOptions;
