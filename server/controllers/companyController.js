import db from '../models/CompanyModel.js'

export const getAllCompanies = (req, res, next) => {
    try {
        const query = `SELECT c.*, i.*, v.*
                        FROM companies c
                        LEFT JOIN images i ON c.company_id = i.company_id
                        LEFT JOIN videos v ON c.company_id = v.company_id
                        WHERE c.isDeleted = 0
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
                            images: [],
                            videos: []
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
    catch (err) {
        next(err)
    }
};

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
                        db.run(insertImage, [image.filename, image_titles[index], company_id], function (err) {
                            if (err) {
                                console.log(err.message)
                                res.status(500).json({ error: err.message })
                            }
                        })
                    })
                }
                if (video_src) {
                    video_src.forEach((video, index) => {
                        db.run(insertVideo, [video.filename, video_titles[index], company_id], function (err) {
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

export const updateCompany = async (req, res, next) => {
    try {
        const { company_id } = req.query
        if (!company_id) {
            res.status(400).json({ error: 'Missing company_id' })
            return;
        }
        const { company_name, description, address, phone } = req.body

        let query = `UPDATE companies
                SET company_name = ?,
                    description = ?,
                    address = ?,
                    phone = ?
                WHERE company_id = ?`;

        db.run(query, [company_name, description, address, phone, company_id], function (err) {
            if (err) {
                console.log(err.message)
                res.status(500).json({ error: err.message })
            }
            if (this.changes > 0) {
                res.status(200).json({
                    message: 'Company updated successfully',
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
                    message: 'Company deleted successfully'
                });
            } else {
                return res.status(404).json({
                    message: 'Company not found'
                });
            }
        });
    } catch (err) {
        next(err);
    }
}