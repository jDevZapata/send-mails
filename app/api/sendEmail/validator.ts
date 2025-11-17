import { BodySendMailRequest } from "@/models/bodySendMailRequest.model"

export const validateSendEmail = (body: BodySendMailRequest) => {
    if (!body.from || body.from.length === 0) {
        return { isValid: false, message: 'Email from is required' };
    } else if(!body.from.includes('@')) {
        return { isValid: false, message: 'Email from Format is not correct' };
    } 
    if (!body.to || body.to.length === 0) {
        return { isValid: false, message: 'Email is required' };
    } else if(!body.to.includes('@')) {
        return { isValid: false, message: 'Email Format is not correct' };
    } 
    if (!body.subject) {
        return { isValid: false, message: 'Subject is required' };
    }
    if (!body.content) {
        return { isValid: false, message: 'Content is required' };
    }
    return { isValid: true, message: 'Valid body' };
}