const { processLead } = require('./_shared');

module.exports = async function handler(req, res) {
  return processLead(req, res, 'quote');
};
