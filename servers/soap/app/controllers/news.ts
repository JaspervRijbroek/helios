import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class NewsController {
    @Route('get', 'NewsArticles')
    getNewsArticles(req: Request, res: Response) {
        return res.json({
            NewsArticles: {}
        })
    }
}