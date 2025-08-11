const express = require('express');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
const path = require('path');

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let comments = [
    {id:uuidv4(), username: 'Jane', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
    {id:uuidv4(), username: 'John', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
    {id:uuidv4(), username: 'Aca',  comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
    {id:uuidv4(), username: 'Bojan', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' }
];



app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
})

app.post('/comments',(req,res)=>{
    const {username, comment} = req.body;
    comments.push({username,comment,id:uuidv4()});
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find((c)=>c.id === id);
    res.render('comments/show',{comment});
})

app.patch('/comments/:id',(req,res)=>{

    const {id} = req.params;
    const newTextComment = req.body.comment;
     const foundComment = comments.find((c)=>c.id === id);
     foundComment.comment = newTextComment;
     res.redirect('/comments');
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find((c)=>c.id === id);
    res.render('comments/edit',{comment});
})

app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
   comments= comments.filter((c)=>c.id !== id);
   res.redirect('/comments');
})

app.listen(3030,()=>{
    console.log("Server running on port 3030");
})


