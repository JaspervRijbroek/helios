import {Controller, Route} from "../decorators/routing";

@Controller()
export default class ReportingController {
    @Route('post', 'Reporting/SendHardwareInfo')
    async getClientHardwareInfo() {
        // console.log(req.body);

        return {};
    }

    @Route('post', 'Reporting/SendUserSettings')
    async getClientUserSettings() {
        // console.log(req.body);

        return {};
    }
}