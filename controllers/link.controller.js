import { Link } from '../models/Link.js';
import { nanoid } from 'nanoid';
import { addHttpsIf } from '../middlewares/validationResultExpress.js';

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({uid: req.id});

        res.status(201).json({links});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}

export const getLink = async (req, res) => {
    try {
        const {nanoLink} = req.params;
        const link = await Link.findOne({nanoLink});
        
        if(!link) return res.status(404).json({error : "No existe el link"});
        
        return res.json({link: link.longLink});
    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(500).json({error: "formator id correcto"});
        }
    }
};


//para CRUD Tradicional, donde se solicita el token
export const getLinkCRUD = async (req, res) => {
    try {
        const {id} = req.params;
        const link = await Link.findById(id);
        
        if(!link) return res.status(404).json({error : "No existe el link"});
        
        if(!link.uid.equals(req.id)) return res.status(404).json({error: "su id no coincide con este link"});

        return res.json({link});
    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(500).json({error: "formator id correcto"});
        }
    }
};


export const createLink = async (req, res) => {
    try {
        let {longLink} = req.body;
        longLink = addHttpsIf(longLink);

        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.id});
        const resultado = await link.save();
        res.json({resultado});

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message});
    }
}

export const removeLink = async (req, res) => {
    try {
        const {id} = req.params;
        const link = await Link.findById(id);

        if(!link) return res.status(404).json({error : "No existe el link"});
        
        if(!link.uid.equals(req.id)) return res.status(404).json({error: "su id no coincide con este link"});
        
        let removedLink = await link.remove();
        return res.json({removedLink});
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(500).json({error: "formator id correcto"});
        }
    }
};

export const updateLink = async (req, res) => {
    try {
        const {id} = req.params;
        let {longLink} = req.body;
        longLink = addHttpsIf(longLink);

        const link = await Link.findById(id);

        if(!link) return res.status(404).json({error : "No existe el link"});
        
        if(!link.uid.equals(req.id)) return res.status(404).json({error: "su id no coincide con este link"});
        
        link.longLink = longLink;
        await link.save();
        return res.json({link});
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(500).json({error: "formator id correcto"});
        }
    }
};

