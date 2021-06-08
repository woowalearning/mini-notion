import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('google/callback')
  async getOauth(
    @Query('id_token') id_token: string,
    @Res() res: Response,
  ): Promise<void> {
    const accessToken = await this.oauthService.getCallback(id_token);

    res.redirect(`http://localhost:8080/?token=${accessToken}`);
  }
}
