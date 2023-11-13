import db from "../models/CompanyModel.js";

export const getProductByCompanyId = (req, res, next) => {
    try {
        const { company_id } = req.query
        if (!company_id) {
            return res.json({
                errCode: 1,
                errMessage: "Missing required parameter",
                data: []
            })
        }
        const query = `SELECT * FROM CompanyProduct WHERE company_id = ?
        ORDER BY product_id DESC`
        db.all(query, [company_id], function (err, rows) {
            if (err) {
                return res.json({
                    errCode: 2,
                    errMessage: "Error while getting products",
                    data: []
                })
            }
            if (rows.length > 0) {
                return res.json({
                    errCode: 0,
                    errMessage: "Get products successfully",
                    data: rows
                })
            } else {
                return res.json({
                    errCode: 1,
                    errMessage: "Not found any products",
                    data: []
                })
            }
        })
    } catch (err) {
        next(err)
    }
}

export const createProductByCompanyId = (req, res, next) => {
    try {
        const { company_id } = req.query
        const { title, description } = req.body
        const banner_img = req.files.banner_img[0].filename
        const other_products = req.files.other_products
        let other_products_filename = []
        if (other_products) {
            other_products.forEach(other_product => {
                other_products_filename.push(other_product.filename)
            })

            if (!company_id) {
                return res.json({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                })
            }

            const query = `INSERT INTO 
       products (banner_img, title, description, other_products, company_id)
       VALUES (?, ?, ?, ?, ?)
       `

            db.run(query, [banner_img, title, description, JSON.stringify(other_products_filename), company_id], function (err) {
                if (err) {
                    return res.json({
                        errCode: 2,
                        errMessage: "Error while creating product",
                    })
                }
            })

        }
        return res.json({
            errCode: 0,
            errMessage: "Create product successfully",
        })

    } catch (err) {
        next(err)
    }
}
export const updateProductByProductId = (req, res, next) => {
    try {
        const { product_id } = req.query
        const { title, description } = req.body
        const banner_img = req.files.banner_img[0].filename
        const other_products = req.files.other_products
        let other_products_filename = []
        if (other_products) {
            other_products.forEach(other_product => {
                other_products_filename.push(other_product.filename)
            })
        }

        if (!product_id) {
            return res.json({
                errCode: 1,
                errMessage: "Missing required parameter",
            })
        }
        const query = `UPDATE products SET banner_img = ?, title = ?, description = ?, other_products = ? WHERE product_id = ?`
        db.run(query, [banner_img, title, description, JSON.stringify(other_products_filename), product_id], function (err) {
            if (err) {
                return res.json({
                    errCode: 2,
                    errMessage: "Error while updating product",
                })
            }
            return res.json({
                errCode: 0,
                errMessage: "Update product successfully",
            })
        })
    } catch (err) {
        next(err)
    }
}

export const deleteProductByProductId = (req, res, next) => {
    try {
        const { product_id } = req.query
        if (!product_id) {
            return res.json({
                errCode: 1,
                errMessage: "Missing required parameter",
            })
        }
        const query = `DELETE FROM products WHERE product_id = ?`
        db.run(query, [product_id], function (err) {
            if (err) {
                return res.json({
                    errCode: 2,
                    errMessage: "Error while deleting product",
                })
            }
            return res.json({
                errCode: 0,
                errMessage: "Delete product successfully",
            })
        })
    } catch (err) {
        next(err)
    }
}

