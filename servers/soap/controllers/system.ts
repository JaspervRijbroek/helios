import { Request } from 'express';
import { Controller, Get, Post, Route } from '../decorators/routing';

@Controller()
export default class SystemController {
    @Get('systeminfo')
    async getSystemInfo() {
        let date = new Date();

        return {
            SystemInfo: {
                Branch: 'production',
                ChangeList: 620384,
                ClientVersion: '1614b',
                ClientVersionCheck: false,
                Deployed: '08/20/2013 11:24:40',
                EntitlementsToDownload: true,
                ForcePermanentSession: true,
                JidPrepender: 'nfsw',
                LauncherServiceUrl: {},
                NucleusNamespace: 'nfsw-live',
                NucleusNamespaceWeb: 'nfs_web',
                PersonaCacheTimeout: 900,
                PortalDomain: {},
                PortalSecureDomain: {},
                PortalStoreFailurePage: {},
                PortalTimeOut: 60000,
                ShardName: 'APEX',
                Time: date.toISOString(),
                Version: 2578,
            },
        };
    }

    @Get('getrebroadcasters')
    async getRebroadcasters(req: Request) {
        let udpPort: number = parseInt(process.env.FREEROAM_PORT || '9999', 10);

        return {
            ArrayOfUdpRelayInfo: {
                UdpRelayInfo: {
                    Host: process.env.SERVER_IP,
                    Port: udpPort,
                },
            },
        };
    }

    @Get('getregioninfo')
    async getRegionInfo() {
        return {
            RegionInfo: {
                CountdownProposalInMilliseconds: 3000,
                DirectConnectTimeoutInMilliseconds: 1000,
                DropOutTimeInMilliseconds: 15000,
                EventLoadTimeoutInMilliseconds: 30000,
                HeartbeatIntervalInMilliseconds: 1000,
                UdpRelayBandwidthInBps: 9600,
                UdpRelayTimeoutInMilliseconds: 60000,
            },
        };
    }

    @Post('heartbeat')
    async getHeartbeat() {
        return {
            HeartBeat: {
                MetagameFlags: 2,
                enabledBitField: 0,
            },
        };
    }
}
