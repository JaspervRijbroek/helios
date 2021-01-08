import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class SystemController {
    @Get('systeminfo')
    getSystemInfo() {
        let date = new Date();

        return {
            SystemInfo: {
                Branch: 'production',
                ChangeList: 620384,
                ClientVersion: 637,
                ClientVersionCheck: true,
                Deployed: '08/20/2013 11:24:40',
                EntitlementsToDownload: true,
                ForcePermanentSession: true,
                JidPrepender: 'nfsw',
                LauncherServiceUrl: 'http://10.100.15.202/LauncherService/onlineconfig.aspx',
                NucleusNamespace: 'nfsw-live',
                NucleusNamespaceWeb: 'nfs_web',
                PersonaCacheTimeout: 900,
                PortalDomain: 'world.needforspeed.com',
                PortalSecureDomain: 'world.needforspeed.com',
                PortalStoreFailurePage: 'world.needforspeed.com/webkit/pageLoadError',
                PortalTimeOut: 60000,
                ShardName: 'APEX',
                Time: `2021-01-02T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.0000000+00:00`,
                Version: 2578,
            }
        };
    }

    @Get('getrebroadcasters')
    getRebroadCasters() {
        return {
            ArrayOfUdpRelayInfo: {
                UdpRelayInfo: {
                    Host: '127.0.0.1',
                    Port: 9999
                }
            }
        };
    }

    @Get('getregioninfo')
    getRegionInfo() {
        return {
            RegionInfo: {
                CountdownProposalInMilliseconds: 3000,
                DirectConnectTimeoutInMilliseconds: 1000,
                DropOutTimeInMilliseconds: 15000,
                EventLoadTimeoutInMilliseconds: 30000,
                HeartbeatIntervalInMilliseconds: 1000,
                UdpRelayBandwidthInBps: 9600,
                UdpRelayTimeoutInMilliseconds: 60000
            }
        }
    }

    @Post('heartbeat')
    getHeartbeat() {
        return {
            HeartBeat: {
                MetagameFlags: 2,
                enabledBitField: 0
            }
        }
    }
}
