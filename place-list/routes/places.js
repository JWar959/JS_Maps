const express = require('express');
const router = express.Router();
const geo = require('node-geocoder');

const geocoder = geo({
    provider: 'openstreetmap',
    headers: { 'user-agent': 'My application <ramapomaps@school.edu>'}
});


router.get('/', async (req, res) => {
    const places = await req.db.findPlaces();
    res.json({ places: places });
});

router.put('/', async (req, res) => {
    let lat = 0;
    let lng = 0;
    let address = req.body.address;


    const result = await geocoder.geocode(address); 
    if (result.length > 0) { 
      lat = result[0].latitude;
      lng = result[0].longitude;
      address = result[0].formattedAddress;
    }
    const id = await req.db.createPlace(req.body.label, address, lat, lng); 
    res.json({ id: id, label: req.body.label, address: address, lat: lat, lng: lng });


});

router.delete('/:id', async (req, res) => {
    await req.db.deletePlace(req.params.id);
    res.status(200).send();
})

module.exports = router;