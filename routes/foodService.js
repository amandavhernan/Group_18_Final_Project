import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

//
// This is a demo of how to structure your final project API
// One route file is expected per student, with appropriate HTTP methods on each endpoint
//

// /////////////////////////////////
// Food Inspection Set Demos
// /////////////////////////////////
router.route('/crimePG') // actually localhost:3000/api/foodServicesPG
  .get(async (req, res) => {
    try {
      const url = 'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json';
      const data = await fetch(url);
      const json = await data.json();
      console.log(json);

      res.json({data: json});
    } catch (error) {
      console.log(error);
      res.json({error: error});
    }
  })
  .put((req, res) => {
    try {
      res.json({message: 'put crime endpoint'});
    } catch (error) {
      console.log(error);
      res.json({error: 'Something went wrong on the server'});
    }
  })
  .post((req, res) => {
    try {
      res.json({message: 'post crime endpoint'});
    } catch (error) {
      console.log(error);
      res.json({error: 'Something went wrong on the server'});
    }
  })
  .delete((req, res) => {
    try {
      res.json({message: 'delete crime endpoint'});
    } catch (error) {
      console.log(error);
      res.json({error: 'Something went wrong on the server'});
    }
  });

router.route('/crimePG/:clearance_code_inc_type') // actually localhost:3000/api/foodServicesPG/20782
  .get(async (req, res) => {
    try {
      const url = 'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json';
      const request = await fetch(url);
      const json = await request.json();
      console.log(json);

      const filteredList = json.filter((item, index) => {
        // eslint-disable-next-line camelcase
        const {clearance_code_inc_type} = req.params;
        // eslint-disable-next-line camelcase
        return item.clearance_code_inc_type === clearance_code_inc_type;
      });

      res.json({data: filteredList});
    } catch (error) {
      console.log(error);
      res.json({error: error});
    }
  })
  .put((req, res) => {
    try {
      res.json({message: 'put crime type endpoint'});
    } catch (error) {
      console.log(error);
      res.json({error: 'Something went wrong on the server'});
    }
  })
  .post((req, res) => {
    try {
      res.json({message: 'post crime type endpoint'});
    } catch (error) {
      console.log(error);
      res.json({error: 'Something went wrong on the server'});
    }
  })
  .delete((req, res) => {
    try {
      res.json({message: 'delete crime type endpoint'});
    } catch (error) {
      console.log(error);
      res.json({error: 'Something went wrong on the server'});
    }
  });

export default router;