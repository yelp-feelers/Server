module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'One of them should have seen it coming',
    DATABASE_URL: process.env.DATABASE_URL,
    BUSINESS_DATABASE_URL: process.env.DATABASE_URL,
}  