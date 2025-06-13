
//get user's role and searched cities data
const getuserdata = async(req, res)=>{
    try{

        const role = req.user.role;
        const recentSearchCities = req.user.recentSearchCities;

        res.json({success:true, role, recentSearchCities});

    }catch(error){
        res.json({success:true, message:error.message})
    }
}

//Add recent search cities to the database
const Addrecentsearchcities = async(req, res)=>{
    try{

        const {recentSearchCities} = req.body;
        const user = req.user;

        if(user.recentSearchCities.length < 3){
            user.recentSearchCities.push(recentSearchCities);
        }else{
            user.recentSearchCities.shift();
            user.recentSearchCities.push(recentSearchCities);
        }

        res.json({success:true, message:"City Added"});

    }catch(error){
        res.json({success:true, message:error.message})
    }
}

export {getuserdata, Addrecentsearchcities};