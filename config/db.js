import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log('MongoDB Connected')
    } catch (error) {
        console.error('DB CONNECTION ERROR: ', error)
        process.exit(1)
    }
}

export default connectDB
