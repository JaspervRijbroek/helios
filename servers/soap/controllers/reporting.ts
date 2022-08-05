import { Controller, Post, Route } from '../decorators/routing';

@Controller()
export default class ReportingController {
    @Post('Reporting/SendHardwareInfo')
    async getClientHardwareInfo() {
        // console.log(req.body);

        return {};
    }

    @Post('Reporting/SendUserSettings')
    async getClientUserSettings() {
        // console.log(req.body);

        return {};
    }
}
