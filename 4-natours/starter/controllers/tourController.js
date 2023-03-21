const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


exports.getAllTours = (req,res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length, //useful to show when sending an array
        data: {
            tours //if key:value are same name I can just have tours
        }
    });
}

exports.getTour = (req,res) => { //: to designate a var in the route
    console.log(req.params); // lets us see params being passed

    const id = req.params.id * 1; //shortcut to convert a stringed number to a number
    const tour = tours.find(el => el.id === id) //use find() to look for the tour with the id requested

    // if(id > tours.length) { //error handling user error
    if (!tour){ //this also works for checking for a valid tour
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        });
    };


    res.status(200).json({
        status: 'success',
        data: {
            tour //if key:value are same name I can just have tours
        }
    });
}

exports.createTour = (req, res) => {
    // console.log(req.body);
    // since using  JSON object as a DB we do the following
    const newId = tours[tours.length-1].id + 1
    const newTour = Object.assign({id: newId}, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        }); // 201 = created
    }); //dont use SYNC inside of an event loop like this
}

exports.updateTour = (req,res) => {
    // too complex for scope of project

    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        });
    };

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here..>'
        }
    })
}

exports.deleteTour =  (req,res) => {
    // too complex for scope of project

    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        });
    };

    res.status(204).json({
        status: 'success',
        data: null //data sent back is typically null, postman will show no content
    });
}
