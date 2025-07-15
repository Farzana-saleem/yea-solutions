/**
 * @desc    Send any success response
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
export const success = (message: string, data: any, statusCode: number) => {
    return {
        statusCode: statusCode,
        message,
        error: false,
        data
    };
};

/**
 * @desc    Send any error response
 * @param   {string} message
 * @param   {number} statusCode
 */
export const error = (message: any, statusCode?: number) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    // Get matched code
    const findCode = codes.find((code) => code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        statusCode: statusCode,
        message,
        error: true
    };
};