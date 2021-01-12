import { Request, Response } from "express";
import { parse } from "url";
import { Controller, Route } from "../decorators/routing";
import BaseController from '../../../lib/controller';

@Controller()
export default class AnnouncementsController extends BaseController {
    @Route('get', 'LoginAnnouncements')
    getLoginAnnouncements(req: Request) {
        let urlParts = parse(req.url);

        return {
            LoginAnnouncementsDefinition: {
                Announcements: {
                    LoginAnnouncementDefinition: [{
                        Context: 'NotApplicable',
                        Id: 1,
                        ImageChecksum: -1,
                        ImageUrl: 'snap.jpg',
                        Type: 'ImageOnly',
                    }, {
                        Context: 'NotApplicable',
                        Id: 2,
                        ImageChecksum: -1,
                        ImageUrl: 'snap2.jpg',
                        Type: 'ImageOnly',
                    }, {
                        Context: 'NotApplicable',
                        Id: 3,
                        ImageChecksum: -1,
                        ImageUrl: 'snap3.jpg',
                        Type: 'ImageOnly',
                    }, {
                        Context: 'NotApplicable',
                        Id: 4,
                        ImageChecksum: -1,
                        ImageUrl: 'snap.jpg',
                        Type: 'ImageOnly',
                    }]
                },
                ImagesPath: 'http://localhost:1337/Engine.svc/announcements'
            }
        };
    }
}