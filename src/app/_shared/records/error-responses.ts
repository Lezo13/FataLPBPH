export const ERROR_RESPONSES: Record<number, string> = {
    400: 'Bad Request',
    403: 'Request Forbidden',
    404: 'Request Not Found',
    500: 'Sorry! We were unable to process your request. Please try again and contact support if the problem persists.'
};


export const ERROR_ROUTES: Record<number, string> = {
    404: 'not-found',
    500: 'server-error'
};
