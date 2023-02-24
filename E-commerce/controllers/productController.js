import express from 'express';
import productModel from '../models/productModel.js';
import fs from 'fs';
import slugify from 'slugify';


export const createProductController = async (req, res) => {
   try {
      const { name, description, price, category, quantity, shipping } = req.fields;
      const { photo } = req.files;
      // alidation
      switch (true) {
         case !name:
            return res.status(500).send({ error: 'Name is required' })
         case !description:
            return res.status(500).send({ error: 'description is required' })
         case !price:
            return res.status(500).send({ error: 'price is required' })
         case !category:
            return res.status(500).send({ error: 'category is required' })
         case !quantity:
            return res.status(500).send({ error: 'quantity is required' })
         case photo && photo.size > 1000000:
            return res.status(500).send({
               error: 'photo is required and size will be less than 1 mb'
            })
      }


      const products = new productModel({ ...req.fileds, slug: slugify(name) })
      if (photo) {
         products.photo.data = fs.readFileSync(photo.path)
         products.photo.contentType = photo.type
      }
      await products.save()
      res.status(201).send({ success: true, message: 'Product created', products })
   }
   catch (error) {
      console.log(error);
      res.status(500).send({
         success: false, error, message: "Error in creating product",
      });
   }
}

export const getProductController = async (req, res) => {
   try {
      const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
      res.status(200).send({
         success: true,
         message: 'Getting all products',
         totalProductsCount: products.length,
         products
      })
   }
   catch (error) {
      console.log(error);
      res.status(500).send({
         success: false, error, message: "Error in getting all product",
      });
   }
}