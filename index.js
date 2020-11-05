const app= require('./api/server.js')
const PORT = process.env.PORT || 3001
const HOST = 'localhost' || '127.0.0.1'
app.listen(PORT, (error)=>{
    if(error){
        console.log(error)
        return
    }
    console.log(`The Server is running on: http://${HOST}:${PORT}`)
})