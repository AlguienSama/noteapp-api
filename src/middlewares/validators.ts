import response from "../utils/httpResponses";

const re_email = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const validEmail = (req, res, next) => {
    const checkKeys = (object): boolean => {
        for (let key in object) {
            if (typeof object[key] == 'object') {
                if (!checkKeys(object[key])) { return false;} 
            }
            if (key === 'email') {
                if (!re_email.test(object[key])) {
                    response(res, "BAD_REQUEST");
                    return false;
                }
            }
        }
        return true;
    }

    if (checkKeys(req.body)) {
        next();
    }
}

export const validLength = (length: number = 4) => {
    return (req, res, next) => {
        const checkKeys = (object): boolean => {
            for (let key in object) {
                if (typeof object[key] == 'object') {
                    if (!checkKeys(object[key])) { return false;} 
                }
                if (typeof key === 'string') {
                    if (object[key].length < length) {
                        response(res, "BAD_REQUEST");
                        return false;
                    }
                }
            }
            return true;
        }
    
        if (checkKeys(req.body)) {
            next();
        }
    }
}