import { Controller, Get, Route } from '../decorators/routing';

@Controller()
export default class NewsController {
    @Get('NewsArticles')
    async getNewsArticles() {
        return {
            ArrayOfNewsArticleTrans: {},
        };
    }
}
