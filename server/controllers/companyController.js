import db from '../models/CompanyModel.js'

/**
 * GET /api/companies/companies
 * GET /api/companies/companies?company_id=14
 *
 * Purpose: Get all companies or get a company by company_id.
 *
 * Parameters:
 *    @query [company_id] - Optional. The ID of the company to retrieve. If provided, only the specified company is returned.
 *
 * Response:
 *    - Success:
 *      - status: 200
 *      - body: Array of companies
 *
 *    - Error:
 *      - status: 500
 * */
export const getAllCompanies = (req, res, next) => {
    try {
        let query
        const { company_id } = req.query
        if (company_id) {
            query = `SELECT c.*, i.*, v.*
            FROM companies c
            LEFT JOIN images i ON c.company_id = i.company_id
            LEFT JOIN videos v ON c.company_id = v.company_id
            WHERE c.company_id = (?)`

            db.all(query, [company_id], (err, rows) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).json({ error: err.message })
                }
                if (rows) {
                    const companies = []
                    rows.forEach(row => {
                        const company = companies.find(company => company.company_id === row.company_id)
                        if (company) {
                            if (row.image_src) {
                                const image = company.images.find(image => image.image_id === row.image_id)
                                if (!image) {
                                    company.images.push({
                                        image_id: row.image_id,
                                        image_src: row.image_src,
                                        image_description: row.image_description
                                    })
                                }
                            }
                            if (row.video_src) {
                                const video = company.videos.find(video => video.video_id === row.video_id)
                                if (!video) {
                                    company.videos.push({
                                        video_id: row.video_id,
                                        video_src: row.video_src,
                                        video_description: row.video_description
                                    })
                                }
                            }
                        } else {
                            const newCompany = {
                                company_id: row.company_id,
                                company_name: row.company_name,
                                description: row.description,
                                websiteURL: row.websiteURL,
                                address: row.address,
                                phone: row.phone,
                                isDeleted: row.isDeleted,
                                images: [],
                                videos: [],
                                createdAt: row.createdAt
                            }
                            if (row.image_src) {
                                newCompany.images.push({
                                    image_id: row.image_id,
                                    image_src: row.image_src,
                                    image_description: row.image_description
                                })
                            }
                            if (row.video_src) {
                                newCompany.videos.push({
                                    video_id: row.video_id,
                                    video_src: row.video_src,
                                    video_description: row.video_description
                                })
                            }
                            companies.push(newCompany)
                        }
                    })
                    res.status(200).json(companies)
                } else {
                    res.status(404).json({
                        message: 'No company found',
                    })
                }
            })

        } else {
            query = `SELECT c.*, i.*, v.*
            FROM companies c
            LEFT JOIN images i ON c.company_id = i.company_id
            LEFT JOIN videos v ON c.company_id = v.company_id
            `

            db.all(query, [], (err, rows) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).json({ error: err.message })
                }
                if (rows) {
                    const companies = []
                    rows.forEach(row => {
                        const company = companies.find(company => company.company_id === row.company_id)
                        if (company) {
                            if (row.image_src) {
                                const image = company.images.find(image => image.image_id === row.image_id)
                                if (!image) {
                                    company.images.push({
                                        image_id: row.image_id,
                                        image_src: row.image_src,
                                        image_description: row.image_description
                                    })
                                }
                            }
                            if (row.video_src) {
                                const video = company.videos.find(video => video.video_id === row.video_id)
                                if (!video) {
                                    company.videos.push({
                                        video_id: row.video_id,
                                        video_src: row.video_src,
                                        video_description: row.video_description
                                    })
                                }
                            }
                        } else {
                            const newCompany = {
                                company_id: row.company_id,
                                company_name: row.company_name,
                                description: row.description,
                                websiteURL: row.websiteURL,
                                address: row.address,
                                phone: row.phone,
                                isDeleted: row.isDeleted,
                                images: [],
                                videos: [],
                                createdAt: row.createdAt
                            }
                            if (row.image_src) {
                                newCompany.images.push({
                                    image_id: row.image_id,
                                    image_src: row.image_src,
                                    image_description: row.image_description
                                })
                            }
                            if (row.video_src) {
                                newCompany.videos.push({
                                    video_id: row.video_id,
                                    video_src: row.video_src,
                                    video_description: row.video_description
                                })
                            }
                            companies.push(newCompany)
                        }
                    })
                    res.status(200).json(companies)
                } else {
                    res.status(404).json({
                        message: 'No company found',
                    })
                }
            })
        }

    }
    catch (err) {
        next(err)
    }
};

/**
 * POST /api/companies/create-company
 * Purpose: Create a new company
 * Parameters:
 * @body [company_name] - Required. The name of the company.
 * @body [description] - Optional. The description of the company.
 * @body [websiteUrl] - Optional. The website URL of the company.
 * @body [phone] - Optional. The phone number of the company.
 * @body [address] - Optional. The address of the company.
 * @body [image_src] - Optional. The image of the company.
 * @body [image_titles] - Optional. The title of the image.
 * @body [video_src] - Optional. The video of the company.
 * @body [video_titles] - Optional. The title of the video.
 * @returns
 * - Success:
 *    - status: 200
 *  - body: { message: 'Company created successfully' }
 * - Error:
 *   - status: 500
 * - body: { error: 'error message' }
 */
export const createCompany = async (req, res, next) => {
    try {
        const { company_name, description, websiteUrl, phone, address, image_titles, video_titles } = req.body;
        if (!company_name) {
            res.status(400).json({ error: 'Missing company_name' });
            return;
        }

        const insertCompany = `INSERT INTO companies (company_name, description, websiteURL, phone, address)
        VALUES (?, ?, ?, ?, ?)`
        const insertImage = `INSERT INTO images (image_src, image_description, company_id)
        VALUES (?, ?, ?)`
        const insertVideo = `INSERT INTO videos (video_src, video_description, company_id)
        VALUES (?, ?, ?)`
        // Insert raw data into companies table
        db.run(insertCompany, [company_name, description, websiteUrl, phone, address], function (err) {
            if (err) {
                console.log(err.message)
                res.status(500).json({ error: err.message })
            }
            const company_id = this.lastID
            // Insert images into images table
            const image_src = req.files.image_src
            const video_src = req.files.video_src
            db.serialize(() => {
                if (image_src) {
                    image_src.forEach((image, index) => {
                        db.run(insertImage, [image.filename, Array.isArray(image_titles) ? image_titles[index] : image_titles, company_id], function (err) {
                            if (err) {
                                console.log(err.message)
                                res.status(500).json({ error: err.message })
                            }
                        })
                    })
                }
                if (video_src) {
                    video_src.forEach((video, index) => {
                        db.run(insertVideo, [video.filename, Array.isArray(video_titles) ? video_titles[index] : video_titles, company_id], function (err) {
                            if (err) {
                                console.log(err.message)
                                res.status(500).json({ error: err.message })
                            }
                        })
                    })
                }
            })

        })
        return res.status(200).json({
            message: 'Company created successfully',
        });
    } catch (err) {
        // Rollback transaction on error
        await db.run('ROLLBACK');
        next(err);
    }
};

/** PUT api/companies/update-company/?company_id=14
 *  Purpose: Update a company by company_id
 * Parameters:
 *  @query [company_id] - Required. The ID of the company to update.
 *  @returns 
 * - Success:
 *     - status: 200
 *    - body: { message: 'Company updated successfully' }
 * - Error:
 *    - status: 500
 *   - body: { error: 'error message' }
 */

export const updateCompany = async (req, res, next) => {
    try {
        const { company_id } = req.query;
        const { company_name, description, address, phone, image_titles, video_titles } = req.body;
        const image_src = req.files.image_src;
        const video_src = req.files.video_src;
        const checkCompany = `SELECT * FROM companies WHERE company_id = ?`;
        const updateCompany = `UPDATE companies
              SET company_name = ?,
                  description = ?,
                  address = ?,
                  phone = ?
              WHERE company_id = ?`;

        if (!company_id || !company_name) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        // Check if company exists
        db.get(checkCompany, [company_id], (err, row) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({
                    message: 'Company not exists',
                });
            }

            // Update company
            db.run(updateCompany, [company_name, description, address, phone, company_id], function (err) {
                if (err) {
                    console.log(err.message);
                    return res.status(500).json({ error: err.message });
                }

                if (image_src || image_titles) {
                    // Update: Delete old ones and insert new ones
                    const deleteImage = `DELETE FROM images WHERE company_id = ?`;
                    const insertImage = `INSERT INTO images(image_src, image_description, company_id)
                VALUES (?, ?, ?)`;
                    db.serialize(() => {
                        db.run(deleteImage, [company_id], function (err) {
                            if (err) {
                                console.log(err.message);
                                return res.status(500).json({ error: err.message });
                            }
                        });
                        image_src.forEach((image, index) => {
                            db.run(insertImage, [image.filename, Array.isArray(image_titles) ? image_titles[index] : image_titles, company_id], function (err) {
                                if (err) {
                                    console.log(err.message);
                                    return res.status(500).json({ error: err.message });
                                }
                            });
                        });
                    });
                }

                if (video_src || video_titles) {
                    const deleteVideo = `DELETE FROM videos WHERE company_id = ?`;
                    const insertVideo = `INSERT INTO videos(video_src, video_description, company_id)
                VALUES (?, ?, ?)`;
                    db.serialize(() => {
                        db.run(deleteVideo, [company_id], function (err) {
                            if (err) {
                                console.log(err.message);
                                return res.status(500).json({ error: err.message });
                            }
                        });
                        video_src.forEach((video, index) => {
                            db.run(insertVideo, [video.filename, Array.isArray(video_titles) ? video_titles[index] : video_titles, company_id], function (err) {
                                if (err) {
                                    console.log(err.message);
                                    return res.status(500).json({ error: err.message });
                                }
                            });
                        });
                    });
                }

                if (this.changes > 0) {
                    return res.status(200).json({
                        message: 'Cập nhật thông tin công ty thành công',
                    });
                } else {
                    return res.status(404).json({
                        message: 'Cập nhật thông tin công ty thất bại',
                    });
                }
            });
        });
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /api/companies/delete-company?company_id=14
 * Purpose: Soft delete a company by company_id
 * Parameters:
 * @query [company_id] - Required. The ID of the company to delete.
 * @returns
 * - Success:
 *    - status: 200
 *   - body: { message: 'Company deleted successfully' }
 * - Error:
 *   - status: 500
 * - body: { error: 'error message' }
 */
export const softDeleteCompany = async (req, res, next) => {
    try {
        const { company_id } = req.query
        if (!company_id) {
            res.status(400).json({ error: 'Missing company_id' })
            return;
        }
        const query = `UPDATE companies
                        SET isDeleted = 1
                        where company_id = ?
        `
        await db.run(query, [company_id], function (err) {
            if (err) {
                console.log(err.message)
                res.status(500).json({ error: err.message })
            }
            if (this.changes > 0) {
                res.status(200).json({
                    message: 'Company deleted successfully',
                })
            } else {
                res.status(404).json({
                    message: 'Company not found',
                })
            }
        })
    } catch (err) {
        next(err)
    }
}

/**
 * DELETE /api/companies/hard-delete-company?company_id=14
 * Purpose: Hard delete a company by company_id
 * Parameters:
 * @query [company_id] - Required. The ID of the company to delete.
 * @returns
 * - Success:
 *   - status: 200
 * - body: { message: 'Company deleted successfully' }
 * - Error:
 *  - status: 500
 * - body: { error: 'error message' }
 */

export const hardDeleteCompany = async (req, res, next) => {
    try {
        const { company_id } = req.query;
        if (!company_id) {
            return res.status(400).json({ error: 'Missing company_id' });
        }

        const query = `DELETE FROM companies
                        WHERE company_id = ?`;

        await db.run(query, [company_id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: err.message });
            }

            if (this.changes > 0) {
                return res.status(200).json({
                    message: 'Thông tin công ty đã được xóa vĩnh viễn'
                });
            } else {
                return res.status(404).json({
                    message: 'Không tìm thấy công ty'
                });
            }
        });
    } catch (err) {
        next(err);
    }
}