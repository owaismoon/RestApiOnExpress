var express = require('express');
var bodyParser = require('body-parser');
var  app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var router = express.Router();

var notes=[
    {id:1,title:'Title 1',desc:'bla bla bla...'},
    {id:2,title:'Title 2',desc:'bla bla bla...'},
    {id:3,title:'Title 3',desc:'bla bla bla...'},
];
//get all list of notes
router.get('/notes', function(req, res) {
    res.json(notes);
});
//create a new note
router.post('/notes', function(req, res) {
    if(req.body.id && req.body.title && req.body.desc){
        notes.push(req.body);
        res.status(201).json({ message: 'created successfully' });
    }

    else{
        res.status(400).json({ message: 'all fields required'});
    }
});
//get spicefic data by id
router.get('/notes/:id',function(req,res){
    console.log(req.params.id);
    var body=notes.filter(function(e){
        return e.id==req.params.id
    });
    console.log(body);
    if(body){
        res.status(200).json(body[0]);
    }
    else{
        res.status(404).json({message: 'not found'});
    }
});

router.put('/notes/:id',function(req,res){
    if(req.body.id && req.body.title && req.body.desc){
        notes.forEach(function(v,i){
            if(v.id==req.params.id){
                notes[i]={id:req.body.id,title:req.body.title,desc:req.body.desc};
                res.status(200).json({message: 'updated successfully', data:notes[i]});
            }
        });
    }
});

router.delete('/notes/:id',function(req,res){
    notes.forEach(function(v,i){
        if(v.id==req.param('id')){
            notes.splice(i,1);
            res.status(200).json({message: 'deleted successfully'});
        }
    });
});
app.use('/api', router);

app.listen(3000,function(){
    console.log('server listening at port');
});
