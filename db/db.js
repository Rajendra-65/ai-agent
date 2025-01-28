import mongoose from 'mongoose'

function connect() {
    mongoose.connect(process.env.mongo_URI)
        .then(()=>{
            console.log('Connected to MongoDb')
        })
        .catch(err=>{
            console.log(err)
        })
}

export default connect