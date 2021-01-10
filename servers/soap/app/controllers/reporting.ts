import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class ReportingController {
    @Route('post', 'Reporting/SendHardwareInfo')
    getClientHardwareInfo(req: Request, res: Response) {
        // console.log(req.body);

        return res.json({});
    }

    @Route('post', 'Reporting/SendUserSettings')
    getClientUserSettings(req: Request, res: Response) {
        // console.log(req.body);

        return res.json({});
    }
}