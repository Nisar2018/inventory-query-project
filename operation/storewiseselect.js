const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const sql = require('mssql');
const app = express();
const router =express.Router();
const config= require('../dbConfig');



  const query1 =  "select * from mqbrandname" ; 
  const query2 = "select * from mqitemname";
  const query3 = "select * from mqstore";


router.get('/', async(req,res)=>{

  
      // make sure that any items are correctly URL encoded in the connection string
            
      let pool = await sql.connect(config);       
    try {   
      //console.log('db connected');
      
      const query4 = "select * from mqstocksummarystorewise";

      const result1 = await pool.request().query(query1);
      const result2 = await pool.request().query(query2);
      const result3 = await pool.request().query(query3);
      const result4 = await pool.request().query(query4);
  
      //console.log('query executed');
     // console.log(result);
      res.render('storewiseinquiry',{
      title: 'Items Inquiry Storewise', brand:result1.recordset, 
                                        item:result2.recordset ,
                                        store:result3.recordset ,
                                        storewise:result4.recordset });
      pool.close();
      sql.close();
     // console.log('db connection closed');
    
    } catch (err) {
      console.log(err);
      res.send('There is some problem in dbconnection or network ');
      }
  }); 
  
  router.post('/partsearch', async(req,res)=>{
    
    // console.log(req.body.vbrand);
   //console.log(req.body.vitem);
    const pbrand = req.body.vbrand;
    const pitem = req.body.vitem;
    const pstore = req.body.vstore;

   // console.log(pbrand);
   // console.log(pitem);
   // console.log(pstore);
   
  // const query4 = " select * from mqstocksummarystorewise where Itemname like '%"+pitem+"%' and brandname like '%"+pbrand+"%' and storename1 like '%"+pstore+"' " ;
  const query4 = " select * from mqstocksummarystorewise where Itemname like '%"+pitem+"%' and brandname like '%"+pbrand+"%' " ; 

   try {
          // make sure that any items are correctly URL encoded in the connection string

          let pool = await sql.connect(config);
          const result1 = await pool.request().query(query1);
          const result2 = await pool.request().query(query2);
          const result3 = await pool.request().query(query3);
          const result4 = await pool.request().query(query4);

   //console.log('query executed');
  // console.log(result);
   res.render('storewiseinquiry',{
   title: 'Items Inquiry Storewise', brand:result1.recordset, 
                                     item:result2.recordset ,
                                     store:result3.recordset ,
                                     storewise:result4.recordset });
          pool.close();
          sql.close();
         // console.log('db connection closed');
        } catch (err) {
           console.log(err);
                        } 

      });  
 
  module.exports=router;
