import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

import { SettingService } from '../modules/setting/setting.service';
import { AliyunOssClient } from './oss/aliyun-oss-client';
import { OssClient } from './oss/oss-client';

export class Oss {
  settingService: SettingService;
  configService: ConfigService;
  config: Record<string, unknown>;
  ossClient: OssClient;

  constructor(settingService: SettingService, configService: ConfigService) {
    this.settingService = settingService;
    this.configService = configService;
  }

  private async getConfig() {
    const data = await this.settingService.findAll(true);
    const config = JSON.parse(data.oss);
    if (!config) {
      throw new HttpException('OSS 配置不完善，无法进行操作', HttpStatus.BAD_REQUEST);
    }
    return config as Record<string, unknown>;
  }

  private async getOssClient() {
    const config = await this.getConfig();
    const type = String(config.type).toLowerCase();

    switch (type) {
      case 'aliyun':
      default:
        return new AliyunOssClient(config);
    }
  }

  async putFile(filepath: string, buffer: ReadableStream) {
    //const client = await this.getOssClient();
    //const url = await client.putFile(filepath, buffer);

    const parent_dir = this.configService.get('FILE_STORAGE_DIR');
    const FILE_BASE_URL = this.configService.get('FILE_BASE_URL');
    const localFinalPath = parent_dir.concat(filepath);

    fs.mkdir(localFinalPath.substring(0, localFinalPath.lastIndexOf('/')), { recursive: true }, (err) => {
      if (err) throw err;
    });

    fs.writeFile(localFinalPath, buffer, (err) => {
      console.log(err);
    });

    return FILE_BASE_URL.concat(filepath);
  }

  async deleteFile(url: string) {
    const client = await this.getOssClient();
    await client.deleteFile(url);
  }
}
