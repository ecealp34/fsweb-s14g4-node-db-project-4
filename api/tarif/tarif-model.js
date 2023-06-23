const db = require("../../data/db-config");

async function adimIdYeGoreIcindekileriGetir(adim_id) {
   
    let icerik = await db("icindekiler_adim as ia")
             .leftJoin("icindekiler as i", "i.icindekiler_id", "ia.icindekiler_id")
             .leftJoin("adim as a", "a.adim_id", "ia.adim_id")
             .select("ia.icindekiler_id", "i.icindekiler_adi", "ia.miktar")
             .where("ia.adim_id", adim_id);
    return icerik;
}

async function idyeGoreTarifGetir(tarif_id) {

    const tarifData = await db("tarif as t")
                        .leftJoin("adim as a", "a.tarif_id", "t.tarif_id")
                        .leftJoin("icindekiler_adim as ia", "ia.adim_id","a.adim_id")
                        .leftJoin("icindekiler as i", "i.icindekiler_id", "ia.icindekiler_id")
                        .select("t.*", "a.adim_id", "a.adim_sirasi", "a.adim_talimati", "i.icindekiler_id", "i.icindekiler_adi","ia.miktar")
                        .where("t.tarif_id", tarif_id);


if(tarifData.length == 0) {
    return null;
}


let tarifNesne = {
    tarif_id:tarifData[0].tarif_id,
    tarif_adi:tarifData[0].tarif_adi,
    kayit_tarihi:tarifData[0].kayit_tarihi,
    adimlar: []
}

for (let i = 0; i < tarifData.length; i++) {
    let adimData = {
        adim_id: tarifData[i].adim_id,
        adim_sirasi:tarifData[i].adim_sirasi,
        adim_talimati:tarifData[i].adim_talimati,
        içindekiler:[]
    }
    if(!!tarifData[i].icindekiler_id) {
        let fromDb = await adimIdYeGoreIcindekileriGetir(tarifData[i].adim_id)
        adimData.icerik = fromDb
    }
    tarifNesne.adimlar.push(adimData);
}

return tarifNesne;

}



module.exports = {
    idyeGoreTarifGetir
}