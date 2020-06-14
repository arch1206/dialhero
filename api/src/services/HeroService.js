const hero = require("../db/models/hero");
const letterNumberJson = {
    'A': 2,
    'B': 2,
    'C': 2,
    'D': 3,
    'E': 3,
    'F': 3,
    'G': 4,
    'H': 4,
    'I': 4,
    'J': 5,
    'K': 5,
    'L': 5,
    'M': 6,
    'N': 6,
    'O': 6,
    'P': 7,
    'Q': 7,
    'R': 7,
    'S': 7,
    'T': 8,
    'U': 8,
    'V': 8,
    'W': 9,
    'X': 9,
    'Y': 9,
    'Z': 9
}
module.exports = {
    getAllHero: async function () {
        let response = { msg: "FAILURE", data: null };
        const data = await hero.find({}, { _id: 0, code: 0, __v: 0 });
        if (data) {
            heros = await hero.find({});
            let formattedPosts = await this.formatForTable(heros);
            // response.draw = draw;
            // response.recordsTotal = formattedPosts.length;
            // response.recordsFiltered = formattedPosts.length;
            // response.msg = "SUCCESS";
            response.data = formattedPosts;
            return response;
        }
        else {
            return response;
        }
    },
    getHero: async function (code) {
        let response = { msg: "FAILURE", data: null };
        const data = await hero.findOne({ "code": code }, { _id: 0, code: 0, __v: 0 });
        if (data) {
            (response.msg = "SUCCESS"), (response.data = data);
            return response;
        }
        else {
            return response;
        }
    },
    insertHero: async function (heroObj) {
        let response = { msg: "FAILURE", data: null };
        const { name } = heroObj;
        var letters = /^[A-Za-z]+$/;
        if (name.match(letters)) {
            const code = await this.codeGenerator(name);
            var heroCount = await hero.find({ "code": code, "name": { $in: [name] } }).count();
            if (heroCount == 0) {
                var hero1 = await hero.findOneAndUpdate({ "code": code }, { $set: { "code": code }, $push: { "name": name } }, { upsert: true, returnNewDocument: true })
                if (hero1) {
                    response.msg = "SUCCESS";
                    response.data = hero1;
                    return response
                }
                else
                    return response
            }
            else
            {
                response.msg = "SUCCESS"
                return response;
            }



        }
        else {
            return response;
        }

    },
    codeGenerator: async function (name) {
        var code = '';
        name = name.toUpperCase();
        for (var e of name) {
            code = code.concat(letterNumberJson[e])
        }
        return code
    },
    formatForTable: async function (heros) {
        let returnHeros = [];
        heros.forEach((doc) => {
            doc.name.forEach((e) => {
                var d = [doc.code, e];
                returnHeros.push(d);
            })
        });
        return returnHeros;
    },
    deleteHero: async function (code, name) {
        let response = { msg: "SUCCESS", data: null };
        var hero1 = await hero.updateOne({ code: code }, { $pull: { 'name': name } })
        return response
    }
};