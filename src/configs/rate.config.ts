
export const rateLimitConfig = {
    max: 50,
    windowMs: 15 * 60 * 1000,
    message: "Too many requests try again later!",
    standardHeaders: true,
    legacyHeaders: false
}