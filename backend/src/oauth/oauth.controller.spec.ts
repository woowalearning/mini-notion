import { Test, TestingModule } from '@nestjs/testing';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';

describe('OAuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [OAuthController],
      providers: [OAuthService],
    }).compile();
  });

  // describe('getHello', () => {
  //   it('should return "Hello World!"', () => {
  //     const oauthController = app.get<OAuthController>(OAuthController);
  //     expect(oauthController.getHello()).toBe('Hello World!');
  //   });
  // });
});
