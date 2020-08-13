//importing express module
const exp = require('express')
//creating server app
const app = exp();

//assigning port number to server
port = 1000;
app.listen(port, () => { console.log(`server is running on ${port}....`) })

//body parsing
app.use(exp.json());

//importing path module
const path = require('path')

//uploading to own server 
app.use(exp.static(path.join(__dirname, './dist/OMS')))

//database url 
const dbUrl = "mongodb://vchanti679:9393490610@cluster0-shard-00-00-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-01-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-02-hfzzf.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"


var dbo;
//connecting to db server
const mc = require('mongodb').MongoClient

//connection to database
mc.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err, clientObj) => {
    if (err) {
        console.log('err in connect', err)
    }
    else {
        //connect to db
        dbo = clientObj.db('orderdb')
        console.log('connected to database')
    }
})


// //post request handler
// app.post('/order', (req, res) => {
//     console.log(req.body)
//     //send data to db
//     dbo.collection('orders').insertOne(req.body, (err, obj) => {
//         console.log(req.body)
//         if (err) {
//             console.log('err in insert', err)
//         }
//         else {
//             res.send({ message: 'data inserted success' })
//         }
//     })
// })


//POST request handler
app.post('/order', (req, res) => {

    dbo.collection('orders').findOne({ orderno: req.body.orderno }
        , (err, result) => {

            if (err) {
                console.log('err in find', err)
            }
            else if (result == null) {
                dbo.collection('orders').insertOne(req.body, (err, obj) => {

                    if (err) {
                        console.log('err in insert', err)
                    }
                    else {
                        res.send({ message: 'data inserted success' })
                    }
                })
            }
            else {
                res.send({ message: 'data already existed' })
            }
        })
})




//GET request handler
app.get('/readAll', (req, res) => {
    //find
    dbo.collection('orders').find().toArray((err, orderArray) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (orderArray == 0) {
            res.send({ message: 'no orders found' })
        }
        else {
            res.send({ message: orderArray })
        }
    })
})


//DELETE request handler
app.delete('/delete/:ono', (req, res) => {
    let x = (+req.params.ono);
    dbo.collection('orders').deleteOne({ orderno: x }, (err, dobj) => {
        if (err) {
            console.log('err in delete', err)
        }
        else {
            res.send({ message: 'deleted successful' })
        }
    })
})



//PUT request handler
app.put('/update', (req, res) => {
    dbo.collection('orders').find({ orderno: req.body.orderno }, (err, orderObj) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (orderObj == null) {

            res.send({ message: 'no order found' })
        }
        else {
            dbo.collection('orders').updateOne({ orderno: req.body.orderno },
                {
                    $set: {
                        orderduedate: req.body.orderduedate,
                        name: req.body.name, address: req.body.address,
                        contactnumber: req.body.contactnumber, totalvalue: req.body.totalvalue
                    }
                }, (err, success) => {
                    if (err) {
                        console.log('err in update', err)
                    }
                    else {
                        res.send({ message: 'updated successful' })
                    }
                })
        }
    })
})