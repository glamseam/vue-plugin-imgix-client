import type {
    ImgixParams as _ImgixParams,
    SrcsetOptions as _SrcsetOptions
} from '@d-gs/imgix-client'

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
    secureUrlToken?: string
}

export type PluginInstallOptions = Partial<PluginOptions>

export interface PluginImgix extends PluginOptions {
    url: string
}
