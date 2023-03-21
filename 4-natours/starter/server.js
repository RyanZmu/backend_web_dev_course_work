const app = require('./app');

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// When returning to this, try to trace the path a request takes and really understand what is happening