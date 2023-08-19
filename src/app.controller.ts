import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  getUserInfo(@Body('code') code: string) {
    return this.appService.login(code);
  }

  @Post('/get_phone')
  async getPhoneNumber(@Body('code') code: string) {
    const { access_token } = await this.appService.getAccessToken().toPromise();
    return this.appService.getPhoneNumber(code, access_token);
  }

  @Get('/generate_url_lnk')
  async getURLLink() {
    const { access_token } = await this.appService.getAccessToken().toPromise();
    return this.appService.getURLLink(access_token);
  }
}
