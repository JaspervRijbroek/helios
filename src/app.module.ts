import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AchievementsModule } from './achievements/achievements.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { CarsModule } from './cars/cars.module';
import { CatalogModule } from './catalog/catalog.module';
import { ChatModule } from './chat/chat.module';
import { EventsModule } from './events/events.module';
import { GiftsModule } from './gifts/gifts.module';
import { PersonaModule } from './persona/persona.module';
import { SecurityModule } from './security/security.module';
import { SocialModule } from './social/social.module';
import { SystemModule } from './system/system.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportingModule } from './reporting/reporting.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'zeus',
      password: 'zeus',
      database: 'zeus',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AchievementsModule,
    AnnouncementsModule,
    CarsModule,
    CatalogModule,
    ChatModule,
    EventsModule,
    GiftsModule,
    PersonaModule,
    SecurityModule,
    SocialModule,
    SystemModule,
    UserModule,
    ReportingModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
