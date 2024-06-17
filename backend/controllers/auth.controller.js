


const signup= async(req, res)=>{
    res.json({
        message:"signup route"
    })
}

const login= async(req, res)=>{
    res.json({
        message:"login route"
    })
}

const logout= async(req, res)=>{
    res.json({
        message:"logout route"
    })
}

export {
    signup,
    login,
    logout
}