/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface CaptchaConfig {
  key: string;
}

export interface Config {
  captcha: CaptchaConfig;
  imagesUrl: string;
  shop: ServiceConfig;
}

export interface ServiceConfig {
  url: string;
}
