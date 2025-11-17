import { BodySendMailRequest } from "@/models/bodySendMailRequest.model";
import { NextRequest, NextResponse } from "next/server";
import { sendEmailService } from "@/services/sendEmail/sendEmail.service";
import { validateSendEmail } from "./validator";

export async function POST( request : NextRequest) {
    const body: BodySendMailRequest = await request.json();
    const validation = validateSendEmail(body);
    if(validation.isValid === false) {
        return NextResponse.json({ message: validation.message }, { status: 400 });
    }
    const result = await sendEmailService(body);
    if(!result.success) {
        return NextResponse.json({ result }, { status: 500 });
    }
    return NextResponse.json({ result }, { status: 201 });
}