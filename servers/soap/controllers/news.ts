import {Request, Response} from "express";
import {Controller, Route} from "../decorators/routing";
import BaseController from "../../../lib/controller";

@Controller()
export default class NewsController extends BaseController {
    @Route('get', 'NewsArticles')
    getNewsArticles(req: Request) {
        return {
            ArrayOfNewsArticleTrans: {}
        };
    }
}