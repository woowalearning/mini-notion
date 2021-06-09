import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('google/callback')
  async getOauth(
    @Query('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    console.log(code);
    const accessToken = await this.oauthService.getCallback(code);

    res.redirect(`http://localhost:8080/?token=${accessToken}`);
  }
}
