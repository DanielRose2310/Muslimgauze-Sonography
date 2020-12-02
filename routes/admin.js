app.all('/', (req,res, next)=> {
    res.status(403).send({
       message: 'Access Forbidden'
    });
    // or whatever
});
app.use('/media',express.static(path.join(__dirname, 'media')));
app.all('/', (req,res, next)=> {
    res.status(403).send({
       message: 'Access Forbidden'
    });
    // or whatever
});
app.use('/media',express.static(path.join(__dirname, 'media')));