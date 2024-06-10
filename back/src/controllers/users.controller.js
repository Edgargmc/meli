
const MercadolibreService = require('../services/MercadolibreService');

const mercadolibreService = new MercadolibreService();


const profile = async (req, res) => { 
    try {
        const user = await mercadolibreService.getUser();
        res.json(user);
      } catch (error) {
        res.status(500).send(error.message);
      }
}

const getUserRestrictions = async (req, res) => { 
  const { userId } = req.params;
    try {
        const user = await mercadolibreService.getUserRestrictions(userId);
        res.json(user);
      } catch (error) {
        res.status(500).send(error.message);
      }
}

const getUserPurchases = async (req, res) => { 
  const { userId } = req.params;
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  try {
      const user = await mercadolibreService.getUserPurchases(userId, limit, page);
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
}

const getLevel = async (req, res) => { 
  const { levelId } = req.params;

  try {
      const user = await mercadolibreService.getLevel(levelId);
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
}

const getShipment = async (req, res) => { 
  const { shipmentId } = req.params;

  try {
      const user = await mercadolibreService.getShipment(shipmentId);
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
}

const getPayment = async (req, res) => { 
  const { paymentId } = req.params;

  try {
      const user = await mercadolibreService.getPayment(paymentId);
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
}

module.exports = { profile, getUserRestrictions, getUserPurchases, getLevel, getShipment, getPayment}; 