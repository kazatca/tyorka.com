import Joi from 'joi'

export const CaptchaConfigSchema = Joi.object({
  key: Joi.string().required(),
}).meta({ className: 'CaptchaConfig' })

export const ServiceConfigSchema = Joi.object({
  url: Joi.string().required(),
}).meta({ className: 'ServiceConfig' })

export const ConfigSchema = Joi.object({
  $schema: Joi.any(),
  imagesUrl: Joi.string().required(),
  captcha: CaptchaConfigSchema.required(),
  shop: ServiceConfigSchema.required(),
}).meta({ className: 'Config' })