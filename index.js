const express= require('express');
const fs = require('fs');
const http = require('http');
const path= require('path');

var app= express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/ppet',(req,res)=>{
	console.log('get any');
	res.sendFile(path.join(__dirname,"index.html"));
});

var server= app.listen(8000, ()=>{
	console.log('all its good');
});