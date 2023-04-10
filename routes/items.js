const Item = require('../item');
const express = require("express");


const router = express.Router();

const ExpressError = require('../expressError')


// GET /items - this should render a list of shopping items.
// LOOKS LIKE [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
router.get('', (req, res, next) => {
    try{
        return res.json({ items: Item.findAll() });
    } catch(err){
        return next(err)
    }
});

// POST /items - this route should accept JSON data and add it to the shopping list.
// LOOKS LIKE {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}
router.post('/items', function (req, res, next) {
    try {
        if (!req.body.name) throw new ExpressError('Item name is required', 400);
        const newItem = new Item(req.body.name, req.body.price )
        return res.status(201).json({item: newItem})
    } catch (err) {
      return next(err)
    }
});

// GET /items/:name - this route should display a single item’s name and price.
// LOOKS LIKE {“name”: “popsicle”, “price”: 1.45}
router.get('/:name', (req, res, next) => {
    try {
        if (!req.body.name) throw new ExpressError('Item name is required', 400);
        const foundItem = Item.find(req.params.name);
        return res.json({item: foundItem});
    } catch(err){
        return next(err)
    }
});

// PATCH /items/:name, this route should modify a single item’s name and/or price.
// LOOKS LIKE {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}
router.patch('/:name', (req, res, next) => {
    try{
        let foundItem = Item.update(req.params.name, req.body);
        return res.json({ item: foundItem });
    } catch (err) {
        return next(err)
    }
});

// DELETE /items/:name - this route should allow you to delete a specific item from the array.
// LOOKS LIKE {message: “Deleted”}
router.delete('/:name', (req, res, next) => {
    try {
      Item.remove(req.params.name);
      return res.json({message:'Deleted'});
    } catch (err) {
      return next(err)
    }
  });


module.exports = router;