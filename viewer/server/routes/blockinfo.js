
const express = require('express');
const router = express.Router();
const fabric = require('../utils/fabric-wrapper');

// GET /blockinfo/:txid
router.get('/:txid', async(req, res) => {
  try {
    console.log('GET /blockinfo/', req.params.txid);
    const block = await fabric.getBlockByTxID(req.params.txid);
    res.json(
      JSON.parse(block.data.data[0].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[0].rwset.writes[1].value)
    );
  } catch(err) {
    console.error(err);
    res.status(400).json({ status: 400, message: err.message });
  }
});

module.exports = router;
