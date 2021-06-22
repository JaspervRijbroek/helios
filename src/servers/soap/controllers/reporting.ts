import {Controller, Route} from "../decorators/routing";

@Controller()
export default class ReportingController {
    @Route('post', 'Reporting/SendHardwareInfo')
    getClientHardwareInfo() {
        // console.log(req.body);

        return {};
    }

    @Route('post', 'Reporting/SendUserSettings')
    getClientUserSettings() {
        // console.log(req.body);

        return {};
    }
}