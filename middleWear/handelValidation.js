const headerMethod = ['body', 'params', 'query']


const handelValidation = (schema) => {
    return (req, res, next) => {
        let validation = [];
        headerMethod.forEach((key) => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key]);
                if (validationResult.error) {
                    validation.push(validationResult.error.details[0])
                }
            }
        });
        if (validation.length) {
            res.status(400).json({ message: "Validation Error", validation })
        } else {
            next();
        }

    }
}


module.exports = handelValidation