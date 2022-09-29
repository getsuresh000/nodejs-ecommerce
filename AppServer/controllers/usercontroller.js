const { response } = require('express');
const dal = require('../models/dal');
const sql = require('../models/db');
var session;
/* Users Start */

exports.Users = async function (req, res) {
   
    let result = [];
    result = await dal.Users();
  session=req.session;
    if(session.userid){
        res.send(result);
        }
        else if(!session){
            res.send("Please login")
        }
    
};

exports.UserById = async function (req, res) {
    let result = [];
    result = await dal.UserById(req.params.id);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.InsertUser = async (req, res) => {
    let result = [];
    result = await dal.InsertUser(req);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};


exports.RemoveUser = async (req, res) => {
    let result = [];
    result = await dal.RemoveUser(req.params.id)
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.UpdateUser = async (req, res) => {
    let result = [];
    result = await dal.UpdateUser(req)
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

/* Users End*/

/* Category Start */
exports.Category=async function(req,res){
    let result=[];
    result=await dal.Category()
    session=req.session;
    if(session.userid){
    res.send(result);
    }
    else{
        res.send("Please login")
    }
}

exports.CategoryById = async function (req, res) {
    let result = [];
    result = await dal.CategoryById(req.params.id);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.CategoryByName = async function (req, res) {
    let result = [];
    result = await dal.CategoryByName(req);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.InsertCategory=async function(req,res){
    let result = [];
    result = await dal.InsertCategory(req);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
}

exports.DeleteCategory = async (req, res) => {
    let result = [];
    result = await dal.DeleteCategory(req.params.id)
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};
/*Category End */

/* Products Start */

exports.Products = async function (req, res) {
    let result = [];
    result = await dal.Products();
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.ProductById = async function (req, res) {
    let result = [];
    result = await dal.ProductById(req.params.id);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.InsertProduct = async (req, res) => {
    let result = [];
    result = await dal.InsertProduct(req);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};


exports.RemoveProduct = async (req, res) => {
    let result = [];
    result = await dal.RemoveProduct(req.params.id)
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.UpdateProduct = async (req, res) => {
    let result = [];
    result = await dal.UpdateProduct(req)
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

/* Products End*/

/*Wishlist Start */

exports.InsertWishlist=async(req,res)=>{
    let result=[];
    result=await dal.InsertWishlist(req);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
}

exports.Wishlist=async(req,res)=>{
    let result=[];
    result=await dal.Wishlist(req);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
}

exports.RemoveWishlist = async (req, res) => {
    let result = [];
    result = await dal.RemoveWishlist(req.params.id)
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.WishlistByUserId = async function (req, res) {
    let result = [];
    result = await dal.WishlistByUserId(req.params.id);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};
/* wishlist end */

/*orders start */
exports.InsertOrders=async(req,res)=>{
    let result=[];
    result=await dal.InsertOrders(req);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }

}

exports.RemoveOrders = async (req, res) => {
    let result = [];
    result = await dal.RemoveOrders(req.params.id)
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.Orders=async(req,res)=>{
    let result=[];
    result=await dal.Orders(req);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
}

exports.UpdateOrders = async (req, res) => {
    let result = [];
    result = await dal.UpdateOrders(req)
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};

exports.OrdersById = async function (req, res) {
    let result = [];
    result = await dal.OrdersById(req.params.id);
    session=req.session;
    if(session.userid){
        res.send(result);
        }
        else{
            res.send("Please login")
        }
};
/*orders end */



exports.dashboard=(req,res)=>{
   session=req.session;
       
        if(session.userid){
            console.log(session.userid)
        sql.query("SELECT * FROM  users WHERE id=" + session.userid, (err, rows, fields) => {
         
            res.send(rows);
            res.end()
           
        })

    }
    else{
        res.send("please login...")
    }
    }
