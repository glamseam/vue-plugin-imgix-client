import type {
    ImgixParams as _ImgixParams,
    SrcSetOptions as _SrcSetOptions
} from '@d-gs/imgix-client'

export type ImgixParams = _ImgixParams
export type SrcSetOptions = _SrcSetOptions

export interface AttributeConfig {
    src: string
    srcset: string
    sizes: string
}

export interface PluginOptions {
    defaultAttributeConfig: AttributeConfig
    defaultImgClass?: string
    defaultImgixParams?: ImgixParams
    defaultSrcSetOptions?: SrcSetOptions
    secureUrlToken?: string
}

export type PluginInstallOptions = Partial<PluginOptions>

export interface PluginImgix extends PluginOptions {
    url: string
}
