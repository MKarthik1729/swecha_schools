const https = require('https');

function sendPostRequest(numbers,otp,account_type) {
    // Request data
    const requestData = JSON.stringify({
        "route" : "dlt",
        "sender_id" : "SWCHA",
        "message" : "168620",
        "variables_values" : `${account_type}|${otp}`,
        "flash" : 0,
        "numbers" : numbers,
    });

    // Request options
    const options = {
        hostname: process.env.HOST,
        port: process.env.HPORT, 
        path: '/dev/bulkV2',
        method: 'POST',
        headers: {
            "authorization": process.env.AUTH,
            "Content-Type": "application/json"
        }
    };

    // Create a request
    const req = https.request(options, (res) => {
        console.log(`Status code: ${res.statusCode}`);

        // Accumulate response data
        let responseData = '';
        res.on('data', (chunk) => {
            responseData += chunk;
        });

        // Process response data
        res.on('end', () => {
            console.log('Response data:', responseData);
        });
        return requestData
    });

    // Handle request errors
    req.on('error', (error) => {
        console.error('Request error:', error);
    });

    // Send the request with the request data
    req.write(requestData);
    req.end();
}

// Export the function
module.exports = sendPostRequest;
