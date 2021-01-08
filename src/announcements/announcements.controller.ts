import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('securitytoken'))
export class AnnouncementsController {
    @Get('LoginAnnouncements')
    getLoginAnnouncements() {
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
