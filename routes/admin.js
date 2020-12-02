router.all('/', (req,res, next)=> {
    res.status(403).send({
       message: 'Access Forbidden'
    });
    // or whatever
});
//router.use('/media',express.static(path.join(__dirname, 'media')));
router.all('/', (req,res, next)=> {
    res.status(403).send({
       message: 'Access Forbidden'
    });
    // or whatever
});
//router.use('/media',express.static(path.join(__dirname, 'media')));

module.exports = router;