import {
    buildUrlObject as clientBuildUrlObject,
    type ImgixParams,
    type SrcSetOptions
} from '@d-gs/imgix-client'
import { inject } from 'vue'

import type {
    AttributeConfig,
    PluginImgix
} from './types'

export const useImgix = () => {
    const initOptions = inject<PluginImgix>('$pluginVueImgix')

    if (!initOptions) {
        throw new Error(`$pluginVueImgix is not provided`)
    }

    const {
        defaultAttributeConfig,
        defaultImgClass,
        defaultImgixParams,
        defaultSrcSetOptions,
        url
        // secureUrlToken
    } = initOptions

    const margeAttributeConfig = (config: AttributeConfig | undefined): AttributeConfig => {
        return {
            ...defaultAttributeConfig,
            ...config
        }
    }

    const margeImgixParams = (params: ImgixParams | undefined): ImgixParams | undefined => {
        return {
            auto: ['format'],
            ...defaultImgixParams,
            ...params
        }
    }

    const margeSrcSetOptions = (srcSetOptions: SrcSetOptions | undefined): SrcSetOptions => {
        return {
            ...defaultSrcSetOptions,
            ...srcSetOptions
        }
    }

    const buildUrlObject = (
        path: string,
        imgixParams?: ImgixParams,
        srcsetOptions?: SrcSetOptions,
        isPathEncoding?: boolean
    ) => {
        const { src, srcset } = clientBuildUrlObject(
            url,
            path,
            margeImgixParams(imgixParams),
            margeSrcSetOptions(srcsetOptions),
            isPathEncoding
        )

        return {
            src,
            srcset
        }
    }

    return {
        defaultAttributeConfig,
        defaultImgClass,
        defaultImgixParams,
        defaultSrcSetOptions,
        buildUrlObject,
        margeAttributeConfig,
        margeImgixParams,
        margeSrcSetOptions
    }
}
