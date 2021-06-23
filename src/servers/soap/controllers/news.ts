import {Controller, Route} from "../decorators/routing";

@Controller()
export default class NewsController {
    @Route('get', 'NewsArticles')
    async getNewsArticles() {
        return {
            ArrayOfNewsArticleTrans: {}
        };
    }
}