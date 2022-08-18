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

    const margeAttributeConfig = (config: AttributeConfig | undefined): AttributeConfig => {
        return {
            ...initOptions.attributeConfig,
            ...config
        }
    }

    const margeImgixParams = (params: ImgixParams | undefined): ImgixParams | undefined => {
        return {
            ...initOptions.params,
            ...params
        }
    }

    const margeSrcsetOptions = (srcsetOptions: SrcsetOptions | undefined): SrcsetOptions => {
        return {
            ...initOptions.srcsetOptions,
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
            { url: imgixUrl },
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
        defaultAttributeConfig: initOptions.attributeConfig,
        defaultClasses: initOptions.classes,
        defaultParams: initOptions.params,
        defaultUrl: initOptions.url,
        defaultSrcsetOptions: initOptions.srcsetOptions,
        buildUrlObject,
        margeAttributeConfig,
        margeImgixParams,
        margeSrcsetOptions
    }
}
