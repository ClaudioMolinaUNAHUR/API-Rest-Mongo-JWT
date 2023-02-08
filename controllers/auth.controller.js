

const register = (req, res)=> {
    res.json({ok:true})
}

const login = (req, res)=> {
    const { email, password } = req.body;
    return res.json({email, password})
}

export {
    register,
    login
}