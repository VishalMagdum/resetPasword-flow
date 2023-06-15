const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500
    console.log(err)
    if (err.code === 11000) {
        err.message = "Duplicate key error"
        err.statusCode = 400
    }
    res.status(err.statusCode).send({
        success: false,
        message: err.message
    })
    console.log(err)
}

module.exports = { errorMiddleware }

