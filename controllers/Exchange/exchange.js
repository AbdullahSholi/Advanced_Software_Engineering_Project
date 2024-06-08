const Exchange = require('../../models/Exchange/exchange_db_queries');

const addExchange = (req, res) => {
    const newExchange = req.body;
    console.log(req.body);
    Exchange.addExchange(newExchange, (err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};

const addExchangeResource = (req, res) => {
    const newExchange = req.body;
    console.log(req.body);
    Exchange.addExchangeResource(newExchange, (err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};


const getExchangesList = (req, res) => {
    console.log(req.body);
    Exchange.getExchangesList((err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};

const getExchangeResourceList = (req, res) => {
    console.log(req.body);
    Exchange.getExchangeResourceList((err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};

const getExchangeById = (req, res) => {
    console.log(req.params.id);
    Exchange.getExchangesListById(req.params.id, (err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};



const getExchangesListByOfferUserId = (req, res) => {
    console.log(req.params.id);
    Exchange.getExchangesListByOfferUserId(req.params.id, (err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};

const getExchangesListByRequestorUserId = (req, res) => {
    console.log(req.params.id);
    Exchange.getExchangesListByRequestorUserId(req.params.id, (err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};

const getExchangesListByStatus = (req, res) => {
    console.log(req.params.status);
    Exchange.getExchangesListByStatus(req.params.status, (err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};
const updateExchange = (req, res) => {
    console.log(req.params.id);
    Exchange.updateExchange(req.params.id, req.body, (err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};


const deleteExchange = (req, res) => {
    console.log(req.params.id);
    Exchange.deleteExchange(req.params.id, (err, data) => {
        console.log(1);
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the task.'
            });
        } else {
            console.log(1);
            res.send(data);
        }
    });
};

module.exports = {
    addExchange,
    addExchangeResource,
    getExchangesList,
    getExchangeResourceList,
    getExchangeById,
    getExchangesListByStatus,
    getExchangesListByOfferUserId,
    getExchangesListByRequestorUserId,
    updateExchange,
    deleteExchange,
};