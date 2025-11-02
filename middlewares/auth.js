const adminAuth = (req,res,next)=>{
    console.log('authorization checking');
    const token='abc';
    const isAuthorized = token === 'abc'
    if(!isAuthorized)
        res.status(401).send('UnAuthorized')
    else
        next();
}

module.exports={adminAuth}