import {
    buildUrlObject as clientBuildUrlObject,
    type ImgixParams,
    type SrcsetOptions
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
        url: defaultImgixUrl,
        defaultSrcsetOptions
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

    const margeSrcsetOptions = (srcsetOptions: SrcsetOptions | undefined): SrcsetOptions => {
        return {
            ...defaultSrcsetOptions,
            ...srcsetOptions
        }
    }

    const buildUrlObject = (
        imgixUrl: string,
        path: string,
        imgixParams?: ImgixParams,
        srcsetOptions?: SrcsetOptions,
        isPathEncoding?: boolean
    ) => {
        const { src, srcset } = clientBuildUrlObject(
            imgixUrl,
            path,
            margeImgixParams(imgixParams),
            margeSrcsetOptions(srcsetOptions),
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
        defaultImgixUrl,
        defaultSrcsetOptions,
        buildUrlObject,
        margeAttributeConfig,
        margeImgixParams,
        margeSrcsetOptions
    }
}
