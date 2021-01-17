import BaseController from "../../../lib/controller";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class EcommerceController extends BaseController {
    @Route('post', 'personas/:personaId/baskets')
    postBasket(req: any) {
        console.log(req.body.BasketTrans.Items);

        return {};
    }
}