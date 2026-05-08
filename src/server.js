const app = require('./app');

// const PORT = process.env.PORT || 3006;

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
