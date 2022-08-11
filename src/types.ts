import type {
    Client as _Client,
    ImgixParams as _ImgixParams,
    SrcsetOptions as _SrcsetOptions
} from '@d-gs/imgix-client'

export type Client = _Client
export type ImgixParams = _ImgixParams
export type SrcsetOptions = _SrcsetOptions

export interface AttributeConfig {
    src: string
    srcset: string
    sizes: string
}

export interface PluginOptions {
    defaultAttributeConfig: AttributeConfig
    defaultImgClass?: string
    defaultImgixParams?: ImgixParams
    defaultSrcsetOptions?: SrcsetOptions
}

export type PluginInstallOptions = Partial<PluginOptions>

export interface PluginImgix extends PluginOptions {
    url: string
}
