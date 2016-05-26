'use strict';

module.exports = function(req, res, next){

    // save a pointer to the original render() function so we can replace it if we don't have a .template property
    var originalJson = res.json;

    // override default express res.json method to intercept second param
    res.json = function(object, links){

        // set the json function back to its original value (we need to do this so the app instance is correct)
        res.json = originalJson;

        if (!links || links.length<=0){

            // no links provided, therefore process this as normal
            res.json(object);
        }
        else{

            // either add to existing links collection or add new collection
            object.links = (object.links) ? object.links.concat(links) : object.links = links;

            // send modified object to browser
            res.json(object);
        }
    }

    next();
};