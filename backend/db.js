const mongoose = require('mongoose');
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = 'mongodb+srv://ayushmanjha63553:NJacYCNSbPdN2ymt@cluster0.agetc.mongodb.net/EasyEle?retryWrites=true&w=majority&appName=Cluster0' // Customer change url to your db you created in atlas
// mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => { 
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("services");
            foodCollection.find({}).toArray(async function (err, data) {
                if(err) console.log(err);
                else{
                // console.log(data);
                const categoryCollection = await mongoose.connection.db.collection("categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);
                })
            }
            });
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
};
