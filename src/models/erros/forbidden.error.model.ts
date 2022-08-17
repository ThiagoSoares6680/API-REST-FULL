export default class ForbidenError extends Error {
    constructor(
        public message: string,
        public error?: any,
    ){
        super(message);
    }
}