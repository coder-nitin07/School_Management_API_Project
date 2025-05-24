
const authorizedRoles = (...allowedRoles)=>{
    return (req, res, next)=>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({ message: 'Access Denied: You are not authorized for this role' });
        };

        next();
    };
};

module.exports = { authorizedRoles };