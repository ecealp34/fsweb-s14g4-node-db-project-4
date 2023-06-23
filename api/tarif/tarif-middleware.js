const tarifsModel = require("./tarif-model");

async function validateTarifId(req,res,next) {
    try {
        const isExistTarif = await tarifsModel.idyeGoreTarifGetir(req.params.id);
        if(!isExistTarif) {
            res.status(404).json({message:"Tarif yok"});
        } else {
            req.existTarif = isExistTarif;
            next();
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    validateTarifId
}