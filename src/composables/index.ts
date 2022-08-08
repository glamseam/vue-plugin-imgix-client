import ImgixClient from '@imgix/js-core'
import { inject } from 'vue'

import type {
    AttributeConfig,
    ImgixParams,
    PluginImgix,
    SrcSetOptions
} from '../types'

const initImgixParams: ImgixParams = {
    auto: 'format'
}

const initSrcSetOptions: SrcSetOptions = {
    widthTolerance: 0.16,
    maxWidth: 1920,
    devicePixelRatios: [ 1, 1.5, 2, 2.5, 3],
    disableVariableQuality: true
}

export const useImgix = () => {
    const options = inject<PluginImgix>('$pluginVueImgix')

    if (!options) {
        throw new Error(`$pluginVueImgix is not provided`)
    }

    const {
        defaultAttributeConfig,
        defaultImgClass,
        defaultImgixParams,
        defaultSrcSetOptions,
        ...clientOptions
    } = options

    const client = new ImgixClient(clientOptions)

    const margeAttributeConfig = (config: AttributeConfig | undefined): AttributeConfig => {
        return {
            ...defaultAttributeConfig,
            ...config
        }
    }

    const margeImgixParams = (params: ImgixParams | undefined): ImgixParams | undefined => {
        return {
            ...initImgixParams,
            ...defaultImgixParams,
            ...params
        }
    }

    const margeSrcSetOptions = (srcSetOptions: SrcSetOptions | undefined): SrcSetOptions => {
        return {
            ...initSrcSetOptions,
            ...defaultSrcSetOptions,
            ...srcSetOptions
        }
    }

    const buildUrlObject = (
        path: string,
        imgixParams?: ImgixParams,
        options?: SrcSetOptions
    ) => {
        const src = client.buildURL(path, margeImgixParams(imgixParams))

        const srcset = client.buildSrcSet(
            path,
            margeImgixParams(imgixParams),
            margeSrcSetOptions(options)
        )

        return {
            src,
            srcset
        }
    }

    return {
        client,
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
