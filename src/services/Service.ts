class Service {
    static rejectResponse(error: any, code: number = 500) {
        return {error, code};
    }

    static successResponse(payload: any, code: number = 200) {
        return {payload, code};
    }
}

export default Service;
