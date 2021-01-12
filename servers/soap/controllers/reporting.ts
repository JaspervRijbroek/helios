import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from "../../../lib/controller";

@Controller()
export default class ReportingController extends BaseController {
    @Route('post', 'Reporting/SendHardwareInfo')
    getClientHardwareInfo(req: Request) {
        // console.log(req.body);

        return {};
    }

    @Route('post', 'Reporting/SendUserSettings')
    getClientUserSettings(req: Request) {
        // console.log(req.body);

        return {};
    }
}