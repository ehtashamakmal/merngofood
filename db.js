const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://ehtashamakmal:123@cluster0.hayht98.mongodb.net/?retryWrites=true&w=majority'


const db = async () => {


    //await mongoose.connect(mongoURI,{useNewUrlParser: true}, async(err, result) => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);



    console.log("Server Running on  " + mongoose.connection.host)
    console.log("Connected");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    try {
        const data = await fetched_data.find({}).toArray();
        global.food_items = data;

        
        const foodcat = await mongoose.connection.db.collection("foodCat");
      
        const catData = await foodcat.find({}).toArray();
        
        global.foodCat = catData;
            
        
      
        //console.log(global.food_items);

    } catch (err) {
        console.log(err);
    }
};





module.exports = db;

